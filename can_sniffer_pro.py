import serial
import time
import datetime
import threading

# --- CONFIGURACIÓN ---
PORT = 'COM3'  # Cambia por tu puerto (ej: '/dev/ttyUSB0' en Linux/Mac o 'COMX' en Windows)
BAUD = 115200 # Velocidad estándar del OBDLink LX
LOG_FILE = "infiniti_q50_sniff.log"

class CANSniffer:
    def __init__(self):
        self.ser = serial.Serial(PORT, BAUD, timeout=0.1)
        self.running = True

    def send_cmd(self, cmd):
        self.ser.write((cmd + '\r').encode())
        time.sleep(0.2)
        return self.ser.read_all().decode()

    def setup_obd(self):
        print("[*] Inicializando OBDLink LX...")
        self.send_cmd('AT Z')   # Reset
        self.send_cmd('AT SP 6') # Protocolo CAN 11/500
        self.send_cmd('AT H1')   # Ver Headers
        self.send_cmd('AT CAF 0') # Raw Data
        self.send_cmd('AT L1')   # Linefeeds on
        print("[+] Configuración completada. Empezando sniffing...")

    def sniff_logic(self):
        # Iniciamos el monitoreo total
        self.ser.write(b'STMA\r') 
        
        with open(LOG_FILE, "a") as f:
            f.write(f"\n\n--- NUEVA SESIÓN: {datetime.datetime.now()} ---\n")
            while self.running:
                if self.ser.in_waiting:
                    line = self.ser.readline().decode(errors='ignore').strip()
                    if line:
                        timestamp = datetime.datetime.now().strftime("%H:%M:%S.%f")
                        f.write(f"[{timestamp}] {line}\n")
                        f.flush()

    def user_input_loop(self):
        print("\n--- CONTROLES ---")
        print("Escribe el nombre del evento (ej: 'espejos') y pulsa ENTER")
        print("Escribe 'exit' para terminar\n")
        
        with open(LOG_FILE, "a") as f:
            while self.running:
                event_name = input("Evento actual >> ")
                if event_name.lower() == 'exit':
                    self.running = False
                    self.ser.write(b'\r') # Parar STMA
                    break
                
                timestamp = datetime.datetime.now().strftime("%H:%M:%S.%f")
                marker = f"\n>>> EVENTO: {event_name.upper()} AT {timestamp} <<<\n"
                f.write(marker)
                f.flush()
                print(f"[!] Marcador guardado: {event_name}")

if __name__ == "__main__":
    sniffer = CANSniffer()
    sniffer.setup_obd()
    
    # Hilo para la lectura de datos
    t = threading.Thread(target=sniffer.sniff_logic)
    t.start()
    
    # Hilo principal para los inputs del usuario
    sniffer.user_input_loop()
    t.join()
    print("[*] Log guardado en:", LOG_FILE)
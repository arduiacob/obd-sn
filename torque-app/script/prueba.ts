scriptTitle="Q50 Diagnostic Sniffer";
scriptDescription="Prueba de captura de bloque 2101 y logueo de HEX crudo";
scriptPackage="org.jacobo.q50.sniffer";
scriptVersion=1;
scriptAuthor="Jacobo";

/**
 * Se ejecuta una vez al cargar el script
 */
onInit = function() {
    quit = false;
    // Sensor virtual para ver en el dashboard si el script está vivo
    debugSensor = Sensor.createSensor("Q50 Debug Length", "Len", "bytes");
    statusSensor = Sensor.createSensor("Q50 Script Status", "Status", "val");
    statusSensor.setValue(1); // 1 = Iniciado
};

/**
 * Bucle principal
 */
main = function() {
    
    while (!quit) {
        // Importante: Si el PID 2101 requiere un header específico (7E1), 
        // asegúrate de que Torque ya esté comunicando con ese módulo 
        // o usa OBD.query("ATSH7E1\r2101");
        
        var response = OBD.query("2101");
        
        if (response != null) {
            var len = response.length();
            debugSensor.setValue(len);
            
            // Imprimimos el HEX al log interno de Torque
            // Para verlo: Menú -> Realtime Information -> Rueda dentada -> Log View
            Log.log("Q50_RAW: " + response);
            
            // Si la respuesta es larga, vamos por buen camino
            if (len > 100) {
                statusSensor.setValue(100); // 100 = Bloque completo recibido
            } else {
                statusSensor.setValue(50);  // 50 = Respuesta corta o incompleta
            }
        } else {
            statusSensor.setValue(0); // 0 = Sin respuesta
            Log.log("Q50_ERROR: No hay respuesta del OBD");
        }

        // Dormimos 2 segundos para no estresar el bus en las pruebas
        Time.sleep(2000);
    }
};

/**
 * Se ejecuta al detener el script o cerrar Torque
 */
stop = function() {
    quit = true;
    statusSensor.setValue(0);
};
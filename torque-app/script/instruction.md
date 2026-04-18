# Módulo de Optimización: Caja de Cambios (PID 2101)

Este módulo aborda el problema del lag en el refresco de datos de la transmisión (TCM) del Infiniti Q50. Actualmente, al leer múltiples parámetros del PID `2101`, Torque Pro realiza una petición ISO-TP completa por cada sensor, elevando el tiempo de refresco a 2-3 segundos.

**Solución:** Utilizar un **CoreScript** de Torque para realizar una única petición física del bloque de 208 bytes y repartir los datos en sensores virtuales.

---

## 🛠️ Script de Diagnóstico: `q50_diag_test.ts`

Este script es la Fase 1. Su objetivo es capturar la cadena Hexadecimal cruda (Raw HEX) y verificar que recibimos el bloque multilínea completo.

```java
scriptTitle="Q50 Diagnostic Sniffer";
scriptDescription="Captura de bloque 2101 para análisis de offsets";
scriptPackage="org.jacobo.q50.sniffer";
scriptVersion=1;
scriptAuthor="Jacobo";

onInit = function() {
    quit = false;
    debugSensor = Sensor.createSensor("Q50 Debug Length", "Len", "bytes");
    statusSensor = Sensor.createSensor("Q50 Script Status", "Status", "val");
    statusSensor.setValue(1); 
};

main = function() {
    while (!quit) {
        // Realiza la petición al bus. Torque gestiona el handshake ISO-TP automáticamente.
        var response = OBD.query("2101");
        
        if (response != null) {
            var len = response.length();
            debugSensor.setValue(len);
            
            // Logueamos la respuesta para identificar los offsets de los bytes
            Log.log("Q50_RAW: " + response);
            
            if (len > 100) {
                statusSensor.setValue(100); // Bloque completo recibido
            } else {
                statusSensor.setValue(50);  // Respuesta incompleta
            }
        } else {
            statusSensor.setValue(0);
            Log.log("Q50_ERROR: No hay respuesta del OBD");
        }
        Time.sleep(2000);
    }
};

stop = function() {
    quit = true;
};
```

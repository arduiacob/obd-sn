scriptTitle="Q50 Gearbox Master";
scriptDescription="Lee el bloque 2101 una sola vez y reparte los datos a sensores virtuales";
scriptPackage="com.jacobo.q50.gearbox";
scriptVersion=1;
scriptAuthor="Jacobo";

onInit = function() {
    quit = false;
    
    // Creamos los sensores que luego buscarás en la lista de Torque
    s_at_temp = Sensor.createSensor("AT Temp Custom", "Temp", "°C");
    s_gear = Sensor.createSensor("AT Gear Custom", "Gear", "n");
    s_input_rpm = Sensor.createSensor("AT Input RPM", "RPM", "rpm");
};

main = function() {
    // Es vital poner el Header correcto antes de pedir el 2101 de la caja
    // Probablemente necesites enviar ATSH7E1 antes si no está por defecto
    
    while (!quit) {
        // Pedimos el bloque completo. Torque gestiona el ISO-TP multilínea por debajo
        var response = OBD.query("2101"); 
        
        if (response != null && response.length() > 20) {
            
            // Ejemplo: Extraer AT TEMP (Byte T en tu Excel)
            // Si el hex es "61010000..." cada byte son 2 caracteres.
            // Necesitamos calcular el offset exacto basado en tu captura.
            
            // Supongamos que AT_TEMP está en la posición que calculamos (byte 20)
            var hexTemp = response.substring(40, 42); 
            var valTemp = Integer.parseInt(hexTemp, 16) - 55;
            s_at_temp.setValue(valTemp);
            
            // Ejemplo: Extraer Marcha (Byte CR, posición 190 aprox)
            var hexGear = response.substring(190, 192);
            var valGear = Integer.parseInt(hexGear, 16);
            s_gear.setValue(valGear);

            // Log para depurar en la consola de Torque
            // Log.log("AT Temp Actualizada: " + valTemp);
        }

        // Controlamos el refresco: 1 segundo para no saturar
        Time.sleep(1000);
    }
};

stop = function() {
    quit = true;
};
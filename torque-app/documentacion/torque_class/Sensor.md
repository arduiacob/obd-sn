# Sensor

Used for retrieving from, and creating/setting sensors and sensor readings in Torque



## Methods
/**
 * Get the long name of this sensor
 * @return
 */
public String getLongName();

/**
 * Get the short name of this sensor (used as the title in displays)
 * @return
 */
public String getShortName();

/**
 * Get the units of this sensor
 * @return
 */
public String getUnit();

/**
 * Get the PID of this sensor
 * @return
 */
public String getPid();

/**
 * Set a value on a given sensor object
 */
public setValue(double newValue);

/**
 * Get the Sensor value
 * 
 * If it is not populated or retrieved yet it will return zero
 *  
 * This will also trigger a request to update the sensor 
 * (via OBD if required) - this may not be immediately done if other
 * sensors are in the process of being requested, or 
 * the sensor is not available (due to no connection, etc)
 *
 * @return The current value for the sensor, or zero if not present
 */
public Double getValue();

/**
 * Get the sensor value
 *  
 * If it is not populated, then return the default value passed
 *
 * This will trigger a request to update the sensor - this may not be immediately done if other
 * sensors are in the process of being requested, or the sensor is not available (due to no connection, etc)
 *
 * @param defaultValue The value to return if the sensor has no value yet, can be null
 * @return The value of the sensor, or 'defaultValue' if not yet present
 */
public Double getValue(Double defaultValue);


/**
 * Retrieve a sensor by name
 *
 * @param The full name of the sensor
 * @return a Sensor object
 */
public static Sensor getSensorByName(String name);


/**
 * Retrieve a sensor by id
 *
 * This retrieves a sensor by it's id (which is loosely defined as the PID of the sensor)
 * A list of IDs can be viewed using the TorqueScan plugin
 *
 * @param id the ID of the sensor
 * @return
 */
public static Sensor getSensorById(int id);


 /**
 * This creates a 'script' sensor that is then available to the rest of the app (and other scripts)
 *  
 * The sensors are keyed by their fullName - if it already exists, it is overwritten.
 * You cannot overwrite existing non-script sensors - trying will throw an exception in your script
 *  
 * Calling setValue on the returned sensor object can be used to update the value.
 *
 * @param fullName The full, unique name of the sensor
 * @param shortName The shortname of the sensor for use in displays
 * @param units The sensor units (ms, S, psi, km/h, etc) 
 * @return A sensor object representing a new sensor or null if the sensor could not be created
 */
public static Sensor createSensor(String fullName, String shortName, String units);


/**
 * Remove a sensor we created
 * 
 * Sensors created by a script are also automatically cleaned up (removed) when the script is
 * stopped or restarted
 *
 * @param fullName
 * @return true if the sensor was found, was originally created by this script, and was removed.
 */
 public static boolean removeSensor(String fullName);
Examples
An example usage might look like:

/**
 * This is called when the script is first loaded, only once.
 * 
 * This function is required and must complete within 1000ms.
 */
onInit = function() {
   quit = false;
   // Create 'sensor' as a global variable - use 'val' if you want the variable 
   // to be local inside the function only - eg: 'val myVariable = "moo"'
   sensor = Sensor.createSensor("Test sensor","Test","ms");
}

/**
 * This is a 'main' entry point for your script, (if you choose to
 * define this function), it can run indefinitely while (!quit) { ... } style
 * 
 * This function is optional and does not need to be defined.
 */
main = function() {
   while (!quit) {
      // Update the sensor with the current time
      sensor.setValue(Time.currentTimeMillis());
      // Sleep 1 second
      Time.sleep(1000);
   }
}


/**
 * This is called when your main function should stop and exit (if you use the function) 
 * 
 * This function is required if you have defined the main function, it must 
 * return within 1000ms. Usually you will just put a 'quit=true;' here so your
 * main loop exits properly instead of having to be forcibly stopped by the app
 */
stop = function() {
   quit = true;
};
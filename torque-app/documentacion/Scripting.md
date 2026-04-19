# Scripting
Note: Scripts were introduced in version 1.12.32(30-Jan-2022)
Scripting

Torque now supports scripts using a simple java-like scripting language. All scripts are sandboxed and cannot access anything but the allowed classes below

There are two types of scripts in Torque Pro - CoreScripts and PushButton scripts

CoreScripts are designed to run all the time within Torque - they can provide sensors, interact with the user and even talk over OBD PushButton scripts are scripts that are executed when the pushbutton in the app is pressed

An example set of scripts can be seen on the [GitHub] page (admin: not live yet - in progress)



## Accessible Classes
Torque specific classes
Sensor
Log
OBD
Time
Dialog
PushButton
Speech
Sound
Vehicle

## Some of the standard java classes and interfaces
Long
Int
Float
Double
Math
String
HashMap
HashSet
ArrayList
Scanner
StringTokenizer
BigInteger
BigDecimal
Arrays
Collections
LinkedList
Date
SimpleDateFormat
DecimalFormat
NumberFormat


## Example CoreScript
The scriptTitle, scriptDesciption, scriptPackage(etc) lines *must* be the first lines in the script before any comments or anything else is added. Do not add comments at the end or inbetween these lines or the parser may reject the script

### A quick example core script might look like:

```java
scriptTitle="Blank Title";
scriptDescription="This is the script description - these must always be present and must be the first lines in the script";
scriptPackage="org.descriptive.unique.key.for.your.script";
scriptVersion=1;
scriptAuthor="A.N.Other";


/**
 * This is called when the script is first loaded, only once.
 * 
 * This function is required and must complete within 1000ms.
 */
onInit = function() {
   
   // Our quit global flag.  Use the var keyword to make it local
   quit = false;

   // Create a test sensor
   sensor = Sensor.createSensor("Test sensor","Test","S");

};

/**
 * This is called when Torque is connected to an OBD2 device
 * 
 * This function is optional and does not need to be defined.
 */
onOBDConnected = function() {};

/**
 * This is called when Torque is disconnected from the OBD2 device
 *
 * This function is optional and does not need to be defined.
 */
onOBDDisconnected= function() {};

/**
 * This is a 'main' entry point for your script, (if you choose to
 * define this function), it can run indefinitely while (!quit) { ... } style
 * 
 * This function is optional and does not need to be defined.
 */
main = function() {

   // Show a non-blocking dialog
   dialog = Dialog.popup("I am a dialog title","The main method has started","Ok",function(){ Log:log("The ok Button was pressed!"); },function() { Log:log("The dialog was cancelled!");} );

   // Enter our main loop
   while (!quit) {

      // Put the current time milliseconds in the sensor we made
      sensor.setValue(Time.currentTimeMillis());

      // Sleep about a second so we don't chew up CPU
      Time.sleep(1000);
   }


};
```

```java

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

/**
 * This is called when a sensor is read or updated over OBD2, GPS, etc.
 * 
 * This function is optional and does not need to be defined.
 */
onSensorRead = function(sensor) {};
Example Push Button Script
A quick example push button script might look like:

scriptTitle="Example pushbutton script";
scriptDescription="This is a description for the pushbutton script";
scriptPackage="org.descriptive.unique.key.for.your.pushbuttonscript";
scriptVersion=1;
scriptAuthor="A.N.Other";


/**
 * Look at the wiki:  https://wiki.torque-bhp.com/view/Scripting   for documentation
 * If you need a function that is not present, ask on the forums with a description of what you want
 * and I can usually add it!
 */

/**
 * This is called when the script is first loaded, only once.
 *
 * This function is required and must complete within 1000ms.
 */
onInit = function() {

    // An example showing the pushButton variable - probably change this to the name of your script
    // or something descriptive (and short!) to the user
    pushButton.setTopText("Click");
    pushButton.setBottomText("Me");

};
```


```java

/**
 * Called when the button is clicked
 */
onButtonClicked = function() {

    pushButton.setTopText("I was");
    pushButton.setBottomText("Clicked");

    // This is a blocking style popup - execution will stop at this point
    // until the user finishes with the popup
    var returnValue = Dialog.blockingPopup("This is a dialog", "Tap OK or Cancel depending on your mood!", "OK",  "Cancel");

    // We can then process the return value and show a non-blocking popup
    // - this is really simplified. We will only show one button.
    if (returnValue == 1) {
       Dialog.popup("The results!", "You clicked OK!", "Goodbye", function() {}, function() {} );
    } else {
       Dialog.popup("The results!", "You clicked Cancel!", "Goodbye", function() {}, function() {} );
    }

};
```
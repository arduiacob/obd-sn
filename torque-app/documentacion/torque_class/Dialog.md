# Dialog
Used for popping up dialogs asking for confirmation, etc

## Methods
    /**
     * Creates a non-blocking popup. Popups may or may not be shown on the screen based on if the user is 
     * using the torque app (or is using another app)
     *
     * @param title       The dialog title
     * @param message     The message in the popup
     * @param button1Text The text on button1 (positive)
     * @param button1     The function to run when button1 is clicked                    
     * @param onCancelled The function to run if the dialog is dismissed without selecting any option
     * @return 0=cancelled, 1=button1
     */
    public static ScriptDialog popup(String title, String message, String button1Text, function button1, function onCancelled);


    /**
     * Creates a non-blocking popup. Popups may or may not be shown on the screen based on if the user is
     * using the torque app (or is using another app)
     *
     * @param title       The dialog title
     * @param message     The message in the popup
     * @param button1Text The text on button1 (positive)
     * @param button2Text The text on button2 (negative)
     * @param button1     The function to run when button1 is clicked
     * @param button2     The function to run when button2 is clicked
     * @param onCancelled The function to run if the dialog is dismissed without selecting any option
     * @return 0=cancelled, 1=button1, 2=button2 pressed
     */
    public static ScriptDialog popup(String title, String message, String button1Text, String button2Text, Closure button1, Closure button2, Closure onCancelled);


    /**
     * Creates a blocking popup (execution stops in your thread until a button is clicked).
     * Suitable for main thread only, and it is always better to use the non blocking methods.
     *
     * @param title       The dialog title
     * @param message     The message in the popup
     * @param button1Text The text on button1 (positive)
     * @param button2Text The text on button2 (negative)
     * @return 0=cancelled, 1=button1, 2=button2 pressed
     */
    public static int blockingPopup(String title, String message, String button1Text, String button2Text);


    /**
     * Is the dialog visible to the user?
     *
     * returns true if the dialog is showing on screen, false if it is not
     */
    public boolean isVisible();
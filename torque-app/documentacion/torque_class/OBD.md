# OBD
Used for communicating with the Torque' OBD module

## Methods
    /**
     * Is the app connected to the bluetooth device (namely the OBD adpater)
     *
     * @return true if a connection exists
     */
    public static boolean isConnectedToAdapter();


   /**
     * Is the app connected to the ECU (have we found and are talking to an OBD ecu?)
     *
     * @return true if the ECU has been found and is communicating
     */
    public static boolean isConnectedToECU();


    /**
     * Return the number of communications errors experienced talking to the adapter
     * This can range from corrupt data, incorrect data being sent back for the command issued
     * and anything that causes the parser to throw an exception
     *
     * @return The number of communications errors detected
     */
    public static int getCommsErrors();


    /**
     * Get the number of timeouts experienced by the app when talking to the adapter.
     *
     * @return
     */
    public static int getCommsTimeouts();


    /**
     * The current protocol id being used by torque
     */
    public static int getCurrentProtocol();


    /**
     * Returns a string representation of the protocol being used
     *
     * @param id the protocol id
     * @return the name of the protocol
     */
    public static String getProtocolName(int id) 


    /**
     * Is the sensor supported by the ECU
     * Obtained from the 0100, 0120(etc) command this function returns whether or not the supplied
     * mode 01 OBD2 sensor is supported by the ECU
     * 
     * eg: OBD.isSensorSupported(0x04);
     *
     * @return true if the ECU has declared support for this PID
     */
    public static boolean isSensorSupported(int mode01Pid);


    /**
     * Cause Torque to stop communicating with the adapter and let any external plugins do the work
     * 
     * This is when you want to do special things like reconfigure the adapter to talk 
     * to special units (ABS, SRS, Body control, etc) which may require torque to stay 
     * away from asking information from the adapter
     * 
     * Use the exclusive lock method together with the sendCommandGetResponse(...) method to control the adpater.
     *
     * @return an int depicting the state of the lock
     * 
     * 0 = Lock gained OK - you now have exclusive access
     * -1 = Lock failed due to unknown reason
     * -2 = Lock failed due to another lock already being present (from your, or another plugin)
     * -3 = Lock failed due to not being connected to adapter
     * -4 = Lock failed due to not being connected to vehicle ECU
     * -5 = No permissions to access in this manner (enable the ticky-box in the 
     *.      plugin settings for 'full access')
     * -6 = Lock failed due to timeout
     */
    public static int requestExclusiveLock();


    /**
     * Release the exclusive lock the plugin has with the adapter.
     *
     * @param torqueMustReInitializeTheAdapter set this to TRUE if torque must reinit comms with the vehicle
     *                                         ECU to continue communicating - if it is set to FALSE, then
     *                                         Torque will simply continue trying to talk to the ECU from where
     *                                         it left off. Take special care to ensure the adpater is in the
     *                                         proper state to do this
     */
    public static final boolean releaseExclusiveLock(boolean torqueMustReInitializeTheAdapter);


    /**
     * Send a specific request over the OBD bus and return the response as a string
     *
     * This may take a short time to return (as the command is queued up and sent subject to
     * traffic on the obd bus) so it is best to launch this in a non ui thread.
     *
     * @param header can be null. unless you want torque to send an AT SH {header} command, 
     * which torque can then track for when the adapter is released.
     * @return The response from the adapter or a null if the response timed out
     * or was disconnected
     */
    public final static String[] sendCommandGetResponse(String header, String command)
# Vehicle
Utility methods for information in the users vehicle profile settings (since 1.12.6)

## Methods
   
    /**
     * Returns the name of the vehicle profile in use
     *
     * @return the profile name
     */
    public static String getName() ;


    /**
     * Get the engine displacement in litres (if the car is not electric)
     *
     * @return displacement in litres
     */
    public static float getDisplacement();


    /**
     * Gets the vehicle fuel type
     *
     *  PETROL = 0;
     *  DIESEL = 1;
     *  E85 = 2;
     *  E10 = 3;
     *  E15 = 4;
     *  CNG = 5;
     *  LPG = 6;
     *  E20 = 7;
     *  E100 = 8;
     *  ETHANOL = 9;
     *  METHANOL = 10;
     *  E27 = 11;
     *
     * @return the fuel type, expressed as an int
     */
    public int getFuelType();


    /**
     * Returns the custom init used with the OBD2 adapters
     *
     * @return the init, each command separated by '\n'
     */
    public static String getCustomInit();


    /**
     * Get the vehicle weight in kilogrammes including an approximation of driver weight
     *
     * @return the total weight in kg
     */
    public static float getWeight();
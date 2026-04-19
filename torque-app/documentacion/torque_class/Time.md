# Time
Utility methods for dealing with time, sleeping, etc.

# Methods
    /**
     * Sleep for X milliseconds, for use in the main function only
     * @param timeInMillis How long to sleep for in milliseconds (approximate)
     */
    public static final void sleep(long timeInMillis);


    /**
     * Returns the current time of the system in millis. Be aware that this can jump depending on external
     * time synchronization sources, so should not be used in control/loop logic.
     * @return
     */
    public static final long currentTimeMillis();


    /**
     * Gets the elapsed time from boot, including any time passing whilst the device is sleeping
     *
     * This is the preferred timesource for using in any loops as currentTimeMillis can jump backwards and forwards
     * depending on the system clock being updated/resynchronized automatically by ntp(hourly!), or by the user manually.
     *
     * @return the time elapsed from boot
     */
    public static final long elapsedRealtime();
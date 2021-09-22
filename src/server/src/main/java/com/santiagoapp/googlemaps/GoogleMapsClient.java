package com.santiagoapp.googlemaps;

import com.google.maps.GeoApiContext;

/**
 * The Google Maps Client is the general abstraction of the maps provider for the application. In this case this class
 * connects through the Google Maps API for Java and executes the defined operations.
 */
public class GoogleMapsClient {

    // Mock API key.
    private static final String GOOGLE_API_KEY = "AIzaSyA-iVXybHF3daCFhdsCAJMGkeTCY30japw";

    private final GeoApiContext context;

    public GoogleMapsClient() {
        this.context = new GeoApiContext.Builder()
                .apiKey(GOOGLE_API_KEY)
                .build();
    }
}

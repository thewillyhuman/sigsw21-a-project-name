package com.santiagoapp.googlemaps;

import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.model.Distance;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.TravelMode;
import com.santiagoapp.routes.model.Route;
import com.santiagoapp.routes.model.RouteBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    public Route getRouteForRoadName(String roadName, int numberOfDays) {
        String[] roadPlaces = getPointsForRoad(roadName);
        double[] roadDistances = getDistancesForPlaces(roadPlaces);

        double sum = 0.0;
        for(int i = 0; i < roadPlaces.length; i++) {
            System.out.println(roadPlaces[i]);
            System.out.println(roadDistances[i]);
            sum = sum + roadDistances[i];
        }
        System.out.println("Sum -------> " + sum);
        Route route = RouteBuilder.newBuilder().build();


        return route;
    }

    private double[] getDistancesForPlaces(String[] places) {
        double[] distances = new double[places.length];
        for(int i = 0; i < places.length; i++) {

            String[] origin = new String[] { places[i] };
            String[] destination = null;
            if(i == places.length -1)
                destination = new String[] { places[i] };
            else
                destination = new String[] { places[i+1] };

            DistanceMatrixApiRequest request = DistanceMatrixApi.getDistanceMatrix(
                    context,
                    origin,
                    destination
            );

            request = request.mode(TravelMode.WALKING);

            DistanceMatrix matrix = request.awaitIgnoreError();
            Distance distanceTillNextPoint = Arrays.stream(matrix.rows).findFirst().get().elements[0].distance;
            if(!Objects.isNull(distanceTillNextPoint)) {
                distances[i] = distanceTillNextPoint.inMeters;
            }
        }
        return distances;
    }

    private String[] getPointsForRoad(String roadName) {
        List<String> result = new ArrayList<String>();
        try (Stream<String> lines = Files.lines(Paths.get("/Users/thewillyhuman/Projects/thewillyhuman/sigsw21-a-project-name/src/server/src/main/resources/camino_frances.points"))) {
            result = lines.collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }

        String[] stringArray = result.toArray(new String[0]);
        return stringArray;
    }
}

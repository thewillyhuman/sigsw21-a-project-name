package com.santiagoapp.routes;

import com.santiagoapp.googlemaps.GoogleMapsClient;
import com.santiagoapp.routes.model.Route;
import com.santiagoapp.routes.model.RouteBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class RoutesService {

    public Route getRoute(String roadName, String transportMethod, int numberOfDays) {
        /*Route route = RouteBuilder.newBuilder()
                .withOriginPlace(roadName)
                .withDestinationPlace("Santiago de Compostela")
                .withDistance(150.0)
                .withDuration(400)
                .withRouteStages(
                        Collections.singletonList(
                                RouteBuilder.newBuilder()
                                        .withOriginPlace(roadName)
                                        .withDestinationPlace("Punto intermedio")
                                        .withDistance(10)
                                        .withDuration(5)
                                        .withAccommodations(Collections.emptyList())
                                        .withInterestPlaces(Collections.emptyList())
                                        .withRouteLocations(Collections.emptyList())
                                        .withRouteStages(Collections.emptyList())
                                        .build()
                                ))
                .withInterestPlaces(Collections.emptyList())
                .withRouteLocations(Arrays.asList("Pozuelo", "Majadahonda", "Salinas", "Oviedo", "Luarca", "Mundaca", "Barceloma", "Pekin"))
                .withAccommodations(Collections.emptyList())
                .build();

        return route;*/
        String[] places = new GoogleMapsClient().getPointsForRoad("");
        double[] distances = new GoogleMapsClient().getDistancesForPlaces(places);
        return chunker(numberOfDays, places, distances);
    }

    private Route routePlanner(int numberOfDays, String[] places, double[] distances) {
        double totalDistance        = Arrays.stream(distances).reduce((a, b) -> a + b).getAsDouble();
        double maxDistancePerDay    = totalDistance / numberOfDays;

        int originPlaceIndex         = -1;
        double distancePerDay       = 0.0;

        List<Route> routeStages = new ArrayList<Route>();
        for(int i = 0; i < distances.length; i++) {
            if(originPlaceIndex == -1) {
                originPlaceIndex = i;
            }

            if( distancePerDay + distances[i] <= maxDistancePerDay ) {
                distancePerDay = distancePerDay + distances[i];
            } else {
                Route stageRoute = RouteBuilder.newBuilder()
                        .withOriginPlace(places[originPlaceIndex])
                        .withDestinationPlace(places[i+1])
                        .withDistance(distancePerDay)
                        .withRouteLocations(
                                Arrays.stream(Arrays.copyOfRange(places, originPlaceIndex, i)).collect(Collectors.toList())
                        )
                        .build();

                routeStages.add(stageRoute);

                // Initialize the variables that are needed inside the loop.
                originPlaceIndex = -1;
                distancePerDay = 0.0;
            }
        }

        return RouteBuilder.newBuilder()
                .withOriginPlace(places[0])
                .withDestinationPlace(places[places.length - 1])
                .withDistance(totalDistance)
                .withRouteLocations(Arrays.stream(places).collect(Collectors.toList()))
                .withRouteStages(routeStages)
                .build();
    }

    private Route chunker(int numberOfDays, String[] places, double[] distances) {
        List<Route> routeStages = new ArrayList<Route>();
        int chunkSize = places.length / (numberOfDays);
        for(int i=0;i<places.length; i+=chunkSize){
           String [] placesSubset = Arrays.copyOfRange(places, i, Math.min(places.length, i+chunkSize));
           double[] distancesSubset = Arrays.copyOfRange(distances, i, Math.min(distances.length, i+chunkSize));

            Route stageRoute = RouteBuilder.newBuilder()
                    .withOriginPlace(placesSubset[0])
                    .withDestinationPlace(placesSubset[placesSubset.length - 1])
                    .withDistance(Arrays.stream(distancesSubset).sum())
                    .withRouteLocations(
                            Arrays.stream(placesSubset).collect(Collectors.toList())
                    )
                    .build();
            routeStages.add(stageRoute);
        }

        return RouteBuilder.newBuilder()
                .withOriginPlace(places[0])
                .withDestinationPlace(places[places.length - 1])
                .withDistance(Arrays.stream(distances).sum())
                .withRouteLocations(Arrays.stream(places).collect(Collectors.toList()))
                .withRouteStages(routeStages)
                .build();
    }
}

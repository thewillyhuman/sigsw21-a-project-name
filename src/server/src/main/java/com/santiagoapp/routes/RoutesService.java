package com.santiagoapp.routes;

import com.santiagoapp.routes.model.Route;
import com.santiagoapp.routes.model.RouteBuilder;

import java.util.Arrays;
import java.util.Collections;

public class RoutesService {

    public Route getRoute(String roadName, String transportMethod, int numberOfDays) {
        Route route = RouteBuilder.newBuilder()
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

        return route;
    }
}

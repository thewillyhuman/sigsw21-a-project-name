package com.santiagoapp.routes;

import com.santiagoapp.googlemaps.GoogleMapsClient;
import com.santiagoapp.routes.model.Route;
import com.santiagoapp.routes.model.RouteBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class RoutesService {

    public Route getRoute(String roadName, String transportMethod, int numberOfDays) {
        String[] places = new GoogleMapsClient().getPointsForRoad(roadName);
        return chunker(numberOfDays, places);
    }

    private Route chunker(int numberOfDays, String[] places) {
        List<Route> routeStages = new ArrayList<Route>();
        int chunkSize = (int) Math.ceil( (float) places.length / (float) numberOfDays );
        for(int i=0;i<places.length; i+=chunkSize){
            String [] placesSubset = Arrays.copyOfRange(places, i, Math.min(places.length, i+chunkSize));

            Route stageRoute = new GoogleMapsClient().getRouteFor(placesSubset);
            routeStages.add(stageRoute);
        }

        return RouteBuilder.newBuilder()
                .withOriginPlace(places[0])
                .withDestinationPlace(places[places.length - 1])
                .withDistance(-1)
                .withRouteLocations(Arrays.stream(places).collect(Collectors.toList()))
                .withRouteStages(routeStages)
                .build();
    }
}

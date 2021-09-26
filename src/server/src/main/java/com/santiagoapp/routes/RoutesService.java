package com.santiagoapp.routes;

import com.santiagoapp.googlemaps.GoogleMapsClient;
import com.santiagoapp.routes.model.Route;
import com.santiagoapp.routes.model.RouteBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class RoutesService {

    public Route getRoute(String roadName, int numberOfDays) {
        String[] places;
        switch (roadName) {
            case "camino_frances": places = Ways.getLinesForFile(Ways.CaminoFrances.POINTS_FILE_NAME); break;
            case "camino_andaluz": places = Ways.getLinesForFile(Ways.CaminoAndaluz.POINTS_FILE_NAME); break;
            case "camino_norte": places = Ways.getLinesForFile(Ways.CaminoGijon.POINTS_FILE_NAME); break;
            default: return RouteBuilder.newBuilder().build();
        }
        return chunker(roadName, numberOfDays, places);
    }

    private Route chunker(String roadName, int numberOfDays, String[] places) {
        List<Route> routeStages = new ArrayList<Route>();
        int chunkSize = (int) Math.ceil( (float) places.length / (float) numberOfDays );
        for(int i=0;i<places.length; i+=chunkSize){
            String [] placesSubset = Arrays.copyOfRange(places, i, Math.min(places.length, i+chunkSize));

            Route stageRoute = new GoogleMapsClient().getRouteFor(placesSubset);
            routeStages.add(stageRoute);
        }

        if (roadName.equalsIgnoreCase("camino_frances")) {
            return RouteBuilder.newBuilder()
                    .withOriginPlace(places[0])
                    .withDestinationPlace(places[places.length - 1])
                    .withDistance(-1)
                    .withRouteLocations(Arrays.stream(places).collect(Collectors.toList()))
                    .withRouteStages(routeStages)
                    .withInterestPlaces(Ways.CaminoFrances.INTEREST_POINTS)
                    .build();
        } else {
            return RouteBuilder.newBuilder()
                    .withOriginPlace(places[0])
                    .withDestinationPlace(places[places.length - 1])
                    .withDistance(-1)
                    .withRouteLocations(Arrays.stream(places).collect(Collectors.toList()))
                    .withRouteStages(routeStages)
                    .build();
        }

    }
}

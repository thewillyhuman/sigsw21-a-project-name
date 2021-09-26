package com.santiagoapp.googlemaps;

import com.google.maps.*;
import com.google.maps.model.*;
import com.santiagoapp.routes.Ways;
import com.santiagoapp.routes.model.Route;
import com.santiagoapp.routes.model.RouteBuilder;
import com.santiagoapp.routes.model.RoutePlace;
import com.santiagoapp.routes.model.RoutePlaceBuilder;

import java.awt.*;
import java.awt.geom.Point2D;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

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
        String[] roadPlaces = Ways.getLinesForFile(Ways.CaminoFrances.POINTS_FILE_NAME);
        double[] roadDistances = getDistancesForPlaces(roadPlaces);

        double sum = 0.0;
        for(int i = 0; i < roadPlaces.length; i++) {
            System.out.println(roadPlaces[i]);
            System.out.println(roadDistances[i]);
            sum = sum + roadDistances[i];
        }
        System.out.println("Sum -------> " + sum / 1000 + " Kms.");
        Route route = RouteBuilder.newBuilder().build();
        return route;
    }

    public double[] getDistancesForPlaces(String[] places) {
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

    /*public String[] getPointsForRoad(String roadName) {
        List<String> result = Arrays.stream(Ways.CAMINO_FRANCES.split("\n")).collect(Collectors.toList());
        String[] stringArray = result.toArray(new String[0]);
        return stringArray;
    }*/

    public Route getRouteFor(final String[] places, TravelMode travelMode) {
        final String origin = places[0].split(",")[0];// + "," + places[0].split(",")[2];
        final String destination = places[places.length - 1].split(",")[0];// + "," + places[places.length - 1].split(",")[2];

        final int originX = (int) Math.round(Double.parseDouble(places[0].split(",")[1]));
        final int originY = (int) Math.round(Double.parseDouble(places[0].split(",")[2]));
        final int destinationX = (int) Math.round(Double.parseDouble(places[places.length - 1].split(",")[1]));
        final int destinationY = (int) Math.round(Double.parseDouble(places[places.length - 1].split(",")[2]));

        // Create the request object.
        DirectionsApiRequest directionsRequest = DirectionsApi.getDirections(
                context,
                origin,
                destination
        );
        // Configure the transport method and the alternative routes.
        directionsRequest.mode(travelMode);
        //directionsRequest.alternatives(false);

        // For each intermediate place add a waypoint to the route.
        LatLng[] waypointsList = new LatLng[25];
        for( int i = 0; (i < places.length - 2 && i < 25); i++) {
            final double latitude = Double.parseDouble(places[i].split(",")[1]);
            final double longitude = Double.parseDouble(places[i].split(",")[2]);
            waypointsList[i] = new LatLng(latitude, longitude);
        }
        // Add the waypoints.
        if(places.length >= 3) {
            int from = 1;
            int to = -1;
            if(places.length >= 28) to = 26;
            else to = places.length - 2;
            directionsRequest.waypoints(Arrays.copyOfRange(places, from, to));
        }

        // Execute the request.
        DirectionsResult result = directionsRequest.awaitIgnoreError();

        if(!Objects.isNull(result)) {
            // Get the result and build the Route result object to return.
            final String originName = places[0].split(",")[0];
            final String destinationName = places[places.length - 1].split(",")[0];
            final double distance = Arrays.stream(result.routes[0].legs).map(leg -> leg.distance.inMeters).reduce((l1, l2) -> l1 + l2).get();
            final double duration = Arrays.stream(result.routes[0].legs).map(leg -> leg.duration.inSeconds).reduce((l1, l2) -> l1 + l2).get() / 3600;
            final String polyline = result.routes[0].overviewPolyline.getEncodedPath();

            List<RoutePlace> accommodations = getPlacesForLocation(places[places.length - 1]);

            final Route resultRoute = RouteBuilder.newBuilder()
                    .withOriginPlace(originName)
                    .withDestinationPlace(destinationName)
                    .withRoutePolyline(polyline)
                    .withRouteLocations(Arrays.stream(places).collect(Collectors.toList()))
                    .withAccommodations(accommodations)
                    .withDuration(duration)
                    .withDistance(distance)
                    .withInterestPlaces(Ways.CaminoFrances.INTEREST_POINTS.stream().filter(
                            ip -> isInterestPointBetweenCities(
                                    new Point(originX,originY),
                                    new Point(destinationX,destinationY),
                                    new Point((int) ip.getCoordinates()[0],(int) ip.getCoordinates()[1])
                            )
                    ).collect(Collectors.toList()))
                    .build();

            return resultRoute;
        }

        return null;
    }

    private boolean isInterestPointBetweenCities(Point2D cityA, Point2D cityB, Point2D interestPoint) {
        double minX = Math.min(cityA.getX(), cityB.getX());
        double maxX = Math.max(cityA.getX(), cityB.getX());
        double minY = Math.min(cityA.getY(), cityB.getY());
        double maxY = Math.max(cityA.getY(), cityB.getY());

        double pointCX = interestPoint.getX();
        double pointCY = interestPoint.getY();

        return (pointCX >= minX && pointCX <= maxX && pointCY >= minY && pointCY <= maxY);
    }

    public List<RoutePlace> getPlacesForLocation(String location) {
        NearbySearchRequest request = PlacesApi.nearbySearchQuery(
                context,
                new LatLng(
                        Double.parseDouble(location.split(",")[1]),
                        Double.parseDouble(location.split(",")[2])
                )
        );

        request.radius(5000);
        request.type(PlaceType.LODGING);
        PlacesSearchResponse result = request.awaitIgnoreError();
        return Arrays.stream(result.results).map(
                    individualResult -> {
                        return RoutePlaceBuilder.newBuilder()
                                .withName(individualResult.name)
                                .withCoordinates(new double[] {individualResult.geometry.location.lat, individualResult.geometry.location.lng})
                                .withRating(individualResult.rating)
                                .withAddress(individualResult.formattedAddress)
                                .withIcon(individualResult.icon.toString())
                                .withOpeningHours(individualResult.openingHours)
                                .withPhotos(individualResult.photos)
                                .withPlaceId(individualResult.placeId)
                                .withStatus(individualResult.businessStatus)
                                .withTypes(individualResult.types)
                                .withUserRatingTotal(individualResult.userRatingsTotal)
                                .withVicinity(individualResult.vicinity)
                                .build();
                    }
                ).collect(Collectors.toList());
    }

    public List<RoutePlace> getInterestPoints() {
        List<RoutePlace> places = new ArrayList<RoutePlace>();
        String[] fileContentLines = Ways.getLinesForFile(Ways.CaminoFrances.INTEREST_POINTS_FILE_NAME);
        for (String line : fileContentLines) {
            String[] lineParts = line.split("\\|\\|\\|");
            if (lineParts.length > 3) {
                String name = lineParts[0];
                String description = lineParts[1];
                String googleId = lineParts[3];
                PlaceDetailsRequest request = PlacesApi.placeDetails(context, googleId);
                PlaceDetails placeDetails = request.awaitIgnoreError();

                if (placeDetails != null)
                    places.add(RoutePlaceBuilder.newBuilder()
                            .withName(placeDetails.name)
                            .withCoordinates(new double[]{placeDetails.geometry.location.lat, placeDetails.geometry.location.lng})
                            .withRating(placeDetails.rating)
                            .withAddress(placeDetails.formattedAddress)
                            .withIcon(placeDetails.icon.toString())
                            .withOpeningHours(placeDetails.openingHours)
                            .withPhotos(placeDetails.photos)
                            .withPlaceId(placeDetails.placeId)
                            .withStatus(placeDetails.businessStatus)
                            .withTypes(new String[]{"interest_point"})
                            .withUserRatingTotal(placeDetails.userRatingsTotal)
                            .withVicinity(placeDetails.vicinity)
                            .build()
                    );
            }
        }
        return places;
    }
}

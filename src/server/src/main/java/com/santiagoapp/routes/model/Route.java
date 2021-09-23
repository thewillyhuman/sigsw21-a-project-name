package com.santiagoapp.routes.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Route {

    @JsonProperty("origin_place")
    private String originPlace;

    @JsonProperty("destination_place")
    private String destinationPlace;

    @JsonProperty("distance")
    private double distance;

    @JsonProperty("duration")
    private double duration;

    @JsonProperty("points_of_interest")
    private List<RoutePlace> interestPlaces;

    @JsonProperty("accommodations")
    private List<RoutePlace> accommodations;

    @JsonProperty("route_stages")
    private List<Route> routeStages;

    @JsonProperty("route_locations")
    private List<String> routeLocations;

    protected Route(String originPlace, String destinationPlace, double distance, double duration,
                 List<RoutePlace> interestPlaces, List<RoutePlace> accommodations, List<Route> routeStages,
                 List<String> routeLocations) {
        this.originPlace = originPlace;
        this.destinationPlace = destinationPlace;
        this.distance = distance;
        this.duration = duration;
        this.interestPlaces = interestPlaces;
        this.accommodations = accommodations;
        this.routeStages = routeStages;
        this.routeLocations = routeLocations;
    }

    public String getOriginPlace() {
        return originPlace;
    }

    public String getDestinationPlace() {
        return destinationPlace;
    }

    public double getDistance() {
        return distance;
    }

    public double getDuration() {
        return duration;
    }

    public List<RoutePlace> getInterestPlaces() {
        return interestPlaces;
    }

    public List<RoutePlace> getAccommodations() {
        return accommodations;
    }

    public List<Route> getRouteStages() {
        return routeStages;
    }

    public List<String> getRouteLocations() {
        return routeLocations;
    }
}

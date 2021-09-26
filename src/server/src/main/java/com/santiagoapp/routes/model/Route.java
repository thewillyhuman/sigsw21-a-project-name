package com.santiagoapp.routes.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Objects;

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

    @JsonProperty("route_polyline")
    private String routePolyline;


    public Route(String originPlace, String destinationPlace, double distance, double duration, List<RoutePlace> interestPlaces, List<RoutePlace> accommodations, List<Route> routeStages, List<String> routeLocations, String routePolyline) {
        this.originPlace = originPlace;
        this.destinationPlace = destinationPlace;
        this.distance = distance;
        this.duration = duration;
        this.interestPlaces = interestPlaces;
        this.accommodations = accommodations;
        this.routeStages = routeStages;
        this.routeLocations = routeLocations;
        this.routePolyline = routePolyline;
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

    public String getRoutePolyline() {
        return routePolyline;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Route route = (Route) o;
        return Double.compare(route.distance, distance) == 0 && Double.compare(route.duration, duration) == 0 && Objects.equals(originPlace, route.originPlace) && Objects.equals(destinationPlace, route.destinationPlace) && Objects.equals(interestPlaces, route.interestPlaces) && Objects.equals(accommodations, route.accommodations) && Objects.equals(routeStages, route.routeStages) && Objects.equals(routeLocations, route.routeLocations) && Objects.equals(routePolyline, route.routePolyline);
    }

    @Override
    public int hashCode() {
        return Objects.hash(originPlace, destinationPlace, distance, duration, interestPlaces, accommodations, routeStages, routeLocations, routePolyline);
    }

    @Override
    public String toString() {
        return "Route{" +
                "originPlace='" + originPlace + '\'' +
                ", destinationPlace='" + destinationPlace + '\'' +
                ", distance=" + distance +
                ", duration=" + duration +
                ", interestPlaces=" + interestPlaces +
                ", accommodations=" + accommodations +
                ", routeStages=" + routeStages +
                ", routeLocations=" + routeLocations +
                ", routePolyline='" + routePolyline + '\'' +
                '}';
    }
}

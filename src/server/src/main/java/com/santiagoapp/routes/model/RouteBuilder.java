package com.santiagoapp.routes.model;

import java.util.List;

public final class RouteBuilder {
    private String originPlace;
    private String destinationPlace;
    private double distance;
    private double duration;
    private List<RoutePlace> interestPlaces;
    private List<RoutePlace> accommodations;
    private List<Route> routeStages;

    private RouteBuilder() {
    }

    public static RouteBuilder newBuilder() {
        return new RouteBuilder();
    }

    public RouteBuilder withOriginPlace(String originPlace) {
        this.originPlace = originPlace;
        return this;
    }

    public RouteBuilder withDestinationPlace(String destinationPlace) {
        this.destinationPlace = destinationPlace;
        return this;
    }

    public RouteBuilder withDistance(double distance) {
        this.distance = distance;
        return this;
    }

    public RouteBuilder withDuration(double duration) {
        this.duration = duration;
        return this;
    }

    public RouteBuilder withInterestPlaces(List<RoutePlace> interestPlaces) {
        this.interestPlaces = interestPlaces;
        return this;
    }

    public RouteBuilder withAccommodations(List<RoutePlace> accommodations) {
        this.accommodations = accommodations;
        return this;
    }

    public RouteBuilder withRouteStages(List<Route> routeStages) {
        this.routeStages = routeStages;
        return this;
    }

    public Route build() {
        return new Route(originPlace, destinationPlace, distance, duration, interestPlaces, accommodations, routeStages);
    }
}

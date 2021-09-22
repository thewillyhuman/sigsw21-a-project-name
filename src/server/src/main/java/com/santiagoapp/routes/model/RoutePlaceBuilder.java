package com.santiagoapp.routes.model;

public final class RoutePlaceBuilder {
    private String name;
    private double[] coordinates;
    private int rating;

    private RoutePlaceBuilder() {
    }

    public static RoutePlaceBuilder newBuilder() {
        return new RoutePlaceBuilder();
    }

    public RoutePlaceBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public RoutePlaceBuilder withCoordinates(double[] coordinates) {
        this.coordinates = coordinates;
        return this;
    }

    public RoutePlaceBuilder withRating(int rating) {
        this.rating = rating;
        return this;
    }

    public RoutePlace build() {
        return new RoutePlace(name, coordinates, rating);
    }
}

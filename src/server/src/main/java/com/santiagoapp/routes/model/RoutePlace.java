package com.santiagoapp.routes.model;

import java.util.Arrays;
import java.util.Objects;

public class RoutePlace {

    private final String name;
    private final double[] coordinates;
    private final int rating;

    protected RoutePlace(String name, double[] coordinates, int rating) {
        this.name = name;
        this.coordinates = coordinates;
        this.rating = rating;
    }

    public String getName() {
        return name;
    }

    public double[] getCoordinates() {
        return coordinates;
    }

    public int getRating() {
        return rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoutePlace that = (RoutePlace) o;
        return rating == that.rating && Objects.equals(name, that.name) && Arrays.equals(coordinates, that.coordinates);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(name, rating);
        result = 31 * result + Arrays.hashCode(coordinates);
        return result;
    }

    @Override
    public String toString() {
        return "RouteLocation{" +
                "name='" + name + '\'' +
                ", coordinates=" + Arrays.toString(coordinates) +
                ", rating=" + rating +
                '}';
    }
}

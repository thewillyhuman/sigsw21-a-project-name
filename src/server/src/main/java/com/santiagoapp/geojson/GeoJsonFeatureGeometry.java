package com.santiagoapp.geojson;

import java.util.Arrays;
import java.util.Objects;

public class GeoJsonFeatureGeometry {

    private final String type;
    private final double[] coordinates;

    public GeoJsonFeatureGeometry(String type, double[] coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }

    public String getType() {
        return type;
    }

    public double[] getCoordinates() {
        return coordinates;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GeoJsonFeatureGeometry that = (GeoJsonFeatureGeometry) o;
        return Objects.equals(type, that.type) && Arrays.equals(coordinates, that.coordinates);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(type);
        result = 31 * result + Arrays.hashCode(coordinates);
        return result;
    }

    @Override
    public String toString() {
        return "GeoJsonFeatureGeometry{" +
                "type='" + type + '\'' +
                ", coordinates=" + Arrays.toString(coordinates) +
                '}';
    }
}

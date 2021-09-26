package com.santiagoapp.geojson;

import java.util.Objects;

public class GeoJsonFeature {

    private final String type;
    private final GeoJsonFeatureProperties properties;
    private final GeoJsonFeatureGeometry geometry;

    public GeoJsonFeature(String type, GeoJsonFeatureProperties properties, GeoJsonFeatureGeometry geometry) {
        this.type = type;
        this.properties = properties;
        this.geometry = geometry;
    }

    public String getType() {
        return type;
    }

    public GeoJsonFeatureProperties getProperties() {
        return properties;
    }

    public GeoJsonFeatureGeometry getGeometry() {
        return geometry;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GeoJsonFeature that = (GeoJsonFeature) o;
        return Objects.equals(type, that.type) && Objects.equals(properties, that.properties) && Objects.equals(geometry, that.geometry);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type, properties, geometry);
    }

    @Override
    public String toString() {
        return "GeoJsonFeature{" +
                "type='" + type + '\'' +
                ", properties=" + properties +
                ", geometry=" + geometry +
                '}';
    }
}

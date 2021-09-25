package com.santiagoapp.geojson;

import java.util.Objects;

public class GeoJsonFeatureProperties {
    private final String dummy;

    public GeoJsonFeatureProperties(String dummy) {
        this.dummy = dummy;
    }

    public String getDummy() {
        return dummy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GeoJsonFeatureProperties that = (GeoJsonFeatureProperties) o;
        return Objects.equals(dummy, that.dummy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dummy);
    }

    @Override
    public String toString() {
        return "GeoJsonFeatureProperties{" +
                "__dummy=" + dummy +
                '}';
    }
}

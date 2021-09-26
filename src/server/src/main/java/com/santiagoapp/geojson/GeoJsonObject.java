package com.santiagoapp.geojson;

import com.google.gson.Gson;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.List;
import java.util.Objects;

public class GeoJsonObject {

    private final String type;
    private final List<GeoJsonFeature> features;

    public static GeoJsonObject fromFile(final String filePath) throws FileNotFoundException {
        Gson gsonObject = new Gson();
        GeoJsonObject geoJsonObject = gsonObject.fromJson(new FileReader(filePath), GeoJsonObject.class);
        return geoJsonObject;
    }

    public GeoJsonObject(String type, List<GeoJsonFeature> features) {
        this.type = type;
        this.features = features;
    }

    public String getType() {
        return type;
    }

    public List<GeoJsonFeature> getFeatures() {
        return features;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GeoJsonObject that = (GeoJsonObject) o;
        return Objects.equals(type, that.type) && Objects.equals(features, that.features);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type, features);
    }

    @Override
    public String toString() {
        return "GeoJsonObject{" +
                "type='" + type + '\'' +
                ", features=" + features +
                '}';
    }
}

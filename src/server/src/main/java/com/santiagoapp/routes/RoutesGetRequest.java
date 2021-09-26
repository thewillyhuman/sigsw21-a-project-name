package com.santiagoapp.routes;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class RoutesGetRequest {

    @JsonProperty("road_name")
    private final String roadName;
    @JsonProperty("transport_method")
    private final String transportMethod;
    @JsonProperty("number_of_days")
    private final int numberOfDays;

    // Needs to have a public constructor to infer the properties from the request.
    public RoutesGetRequest(String roadName, String transportMethod, int numberOfDays) {
        this.roadName = roadName;
        this.transportMethod = transportMethod;
        this.numberOfDays = numberOfDays;
    }

    public String getRoadName() {
        return roadName;
    }

    public String getTransportMethod() {
        return transportMethod;
    }

    public int getNumberOfDays() {
        return numberOfDays;
    }

    @Override
    public String toString() {
        return "RoutesGetRequest{" +
                "pathName='" + roadName + '\'' +
                ", transportMethod='" + transportMethod + '\'' +
                ", numberOfDays=" + numberOfDays +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoutesGetRequest that = (RoutesGetRequest) o;
        return numberOfDays == that.numberOfDays && roadName.equals(that.roadName) && Objects.equals(transportMethod, that.transportMethod);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roadName, transportMethod, numberOfDays);
    }
}

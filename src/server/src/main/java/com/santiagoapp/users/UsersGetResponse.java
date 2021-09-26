package com.santiagoapp.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.santiagoapp.geojson.GeoJsonObject;

import java.util.List;
import java.util.Objects;

public class UsersGetResponse {

    @JsonProperty("request")
    private final UsersGetRequest request;

    @JsonProperty("user_locations")
    private final GeoJsonObject userLocations;

    public UsersGetResponse(UsersGetRequest request, GeoJsonObject userLocations) {
        this.request = request;
        this.userLocations = userLocations;
    }

    public UsersGetRequest getRequest() {
        return request;
    }

    public GeoJsonObject getUserLocations() {
        return userLocations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsersGetResponse that = (UsersGetResponse) o;
        return Objects.equals(request, that.request) && Objects.equals(userLocations, that.userLocations);
    }

    @Override
    public int hashCode() {
        return Objects.hash(request, userLocations);
    }

    @Override
    public String toString() {
        return "UsersGetResponse{" +
                "request=" + request +
                ", userLocations=" + userLocations +
                '}';
    }
}

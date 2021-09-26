package com.santiagoapp.routes;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.santiagoapp.routes.model.Route;

import java.util.Objects;

public class RoutesGetResponse {

    @JsonProperty("request")
    private final RoutesGetRequest request;
    @JsonProperty("route")
    private final Route route;

    protected RoutesGetResponse(RoutesGetRequest request, Route route) {
        this.request = request;
        this.route = route;
    }

    public RoutesGetRequest getRequest() {
        return request;
    }

    public Route getRoute() {
        return route;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoutesGetResponse that = (RoutesGetResponse) o;
        return Objects.equals(request, that.request) && Objects.equals(route, that.route);
    }

    @Override
    public int hashCode() {
        return Objects.hash(request, route);
    }

    @Override
    public String toString() {
        return "RoutesGetResponse{" +
                "request=" + request +
                ", route=" + route +
                '}';
    }
}

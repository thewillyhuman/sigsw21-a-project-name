package com.santiagoapp.routes;

import com.santiagoapp.routes.model.Route;

public final class RoutesGetResponseBuilder {
    private RoutesGetRequest request;
    private Route route;

    private RoutesGetResponseBuilder() {
    }

    public static RoutesGetResponseBuilder newBuilder() {
        return new RoutesGetResponseBuilder();
    }

    public RoutesGetResponseBuilder withRequest(RoutesGetRequest request) {
        this.request = request;
        return this;
    }

    public RoutesGetResponseBuilder withRoute(Route route) {
        this.route = route;
        return this;
    }

    public RoutesGetResponse build() {
        return new RoutesGetResponse(request, route);
    }
}

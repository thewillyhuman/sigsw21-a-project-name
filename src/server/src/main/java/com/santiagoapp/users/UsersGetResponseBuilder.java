package com.santiagoapp.users;

import com.santiagoapp.geojson.GeoJsonObject;

public final class UsersGetResponseBuilder {
    private UsersGetRequest request;
    private GeoJsonObject userLocations;

    private UsersGetResponseBuilder() {
    }

    public static UsersGetResponseBuilder newBuilder() {
        return new UsersGetResponseBuilder();
    }

    public UsersGetResponseBuilder withRequest(UsersGetRequest request) {
        this.request = request;
        return this;
    }

    public UsersGetResponseBuilder withUserLocations(GeoJsonObject userLocations) {
        this.userLocations = userLocations;
        return this;
    }

    public UsersGetResponse build() {
        return new UsersGetResponse(request, userLocations);
    }
}

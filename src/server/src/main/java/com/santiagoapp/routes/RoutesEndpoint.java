package com.santiagoapp.routes;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/routes")
public class RoutesEndpoint {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RoutesGetResponse getRoute(RoutesGetRequest request) {
        RoutesGetResponse response = RoutesGetResponseBuilder.newBuilder()
                .withRequest(request)
                .build();

        return response;
    }
}

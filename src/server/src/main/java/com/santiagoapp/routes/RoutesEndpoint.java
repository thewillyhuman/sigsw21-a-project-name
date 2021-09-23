package com.santiagoapp.routes;

import com.santiagoapp.googlemaps.GoogleMapsClient;
import com.santiagoapp.routes.model.Route;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/routes")
public class RoutesEndpoint {

    RoutesService service = new RoutesService();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RoutesGetResponse getRoute(RoutesGetRequest request) {
        Route route = service.getRoute(request.getRoadName(), request.getTransportMethod(), request.getNumberOfDays());
        RoutesGetResponse response = RoutesGetResponseBuilder.newBuilder()
                .withRequest(request)
                .withRoute(route)
                .build();
        return response;
    }
}

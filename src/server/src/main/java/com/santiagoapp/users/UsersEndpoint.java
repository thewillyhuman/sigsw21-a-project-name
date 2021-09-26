package com.santiagoapp.users;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/users")
public class UsersEndpoint {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public UsersGetResponse getUsers(UsersGetRequest request) {
        return UsersGetResponseBuilder.newBuilder()
                .withRequest(request)
                .withUserLocations(new UsersService().getNearbyUsers(request.getxPosition(), request.getyPosition()))
                .build();
    }
}

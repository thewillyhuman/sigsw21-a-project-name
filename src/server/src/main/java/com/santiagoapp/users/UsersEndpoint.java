package com.santiagoapp.users;

import com.santiagoapp.geojson.GeoJsonObject;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.FileNotFoundException;

@Path("/users")
public class UsersEndpoint {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public UsersGetResponse getUsers(UsersGetRequest request) {

        UsersGetResponse response = null;

        try {
            response = new UsersGetResponse(null, GeoJsonObject.fromFile("C:\\Users\\virtualuser\\Documents\\GitHub\\thewillyhuman\\sigsw21-a-project-name\\src\\server\\src\\main\\resources\\users.geojson"));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        return response;
    }
}

package com.santiagoapp;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/users")
public class UsersEndpoint {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers() {
        return "{\n" +
                "  \"usuarios\": [\n" +
                "    { \"id\": 1, \"coordinadas\": \"132123N 243234E\" },\n" +
                "    { \"id\": 2, \"coordinadas\": \"132123N 243234E\" }\n" +
                "  ]\n" +
                "}";
    }
}

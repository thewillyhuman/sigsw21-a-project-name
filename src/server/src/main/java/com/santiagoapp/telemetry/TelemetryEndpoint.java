package com.santiagoapp.telemetry;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/telemetry")
public class TelemetryEndpoint {

    @GET()
    @Path("/info")
    public String getInfo() {
        return "";
    }

    @GET()
    @Path("/status")
    public String getStatus() {
        return "{\"status\":\"up\"}";
    }
}

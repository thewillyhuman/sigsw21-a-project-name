package com.santiagoapp;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/routes")
public class RoutesEndpoint {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getRoute() {
        return "{\n" +
                "  \"dias\": [\n" +
                "    {\n" +
                "       \"id\":1,\n" +
                "       \"inicio\":\"\",\n" +
                "       \"fin\":\"\",\n" +
                "       \"longitud_km\": 22.2,\n" +
                "       \"tiempo_estimado_h\": 5.6,\n" +
                "       \"alojamientos_destino\": [\n" +
                "         { \"nombre\": \"motel juan\", \"coordenadas\": \"12233N, 12234W\", \"rating\": 5 }\n" +
                "       ],\n" +
                "       \"puntos_interes_ruta\": [\n" +
                "         { \"nombre\": \"iglesia chula\", \"coordenadas\": \"12233N, 12234W\", \"rating\": 5 }\n" +
                "       ]\n" +
                "    }\n" +
                "  ]\n" +
                "}";
    }
}

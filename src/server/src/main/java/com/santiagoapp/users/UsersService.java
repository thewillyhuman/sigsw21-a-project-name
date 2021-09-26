package com.santiagoapp.users;

import com.santiagoapp.geojson.GeoJsonFeature;
import com.santiagoapp.geojson.GeoJsonObject;
import com.santiagoapp.routes.Ways;
import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

public class UsersService {

    private final static String USERS_FILE_NAME = "users.geojson";
    private final static GeoJsonObject USERS = getUsersFromFile();

    private static GeoJsonObject getUsersFromFile() {
        //Get file from resources folder
        ClassLoader classLoader = (new Ways()).getClass().getClassLoader();
        InputStream stream = classLoader.getResourceAsStream(USERS_FILE_NAME);
        try {
            if (stream == null) {
                throw new Exception("Cannot find file " + USERS_FILE_NAME);
            }

            String fileContent = IOUtils.toString(stream, StandardCharsets.UTF_8);
            return GeoJsonObject.fromString(fileContent);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public GeoJsonObject getNearbyUsers(double locationX, double locationY) {
        final int radius = 10000; // 100 Km.
        List<GeoJsonFeature> features = USERS.getFeatures().stream().filter(feature -> {
            double user_x = feature.getGeometry().getCoordinates()[0];
            double user_y = feature.getGeometry().getCoordinates()[1];
            return ((user_x - locationX) * (user_x - locationX) + (user_y - locationY) * (user_y - locationY) <= radius * radius);
        }).collect(Collectors.toList());

        return new GeoJsonObject(USERS.getType(), features);
    }
}

package com.santiagoapp.users;

import com.santiagoapp.geojson.GeoJsonObject;
import com.santiagoapp.routes.Ways;
import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class UsersService {

    private final static String USERS_FILE_NAME = "users.geojson";

    public GeoJsonObject getNearbyUsers(float locationX, float locationY) {

        //Get file from resources folder
        ClassLoader classLoader = (new Ways()).getClass().getClassLoader();
        InputStream stream = classLoader.getResourceAsStream(USERS_FILE_NAME);
        try {
            if (stream == null) {
                throw new Exception("Cannot find file " + USERS_FILE_NAME);
            }

            String fileContent = IOUtils.toString(stream, StandardCharsets.UTF_8);

        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }
}

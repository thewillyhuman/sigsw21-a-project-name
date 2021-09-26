package com.santiagoapp.routes;

import com.santiagoapp.googlemaps.GoogleMapsClient;
import com.santiagoapp.routes.model.RoutePlace;
import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

public class Ways {

    public static class CaminoFrances {
        public static final String POINTS_FILE_NAME = "camino_frances.points";
        public static final String INTEREST_POINTS_FILE_NAME = "camino_frances_ip.points";
        public static final List<RoutePlace> INTEREST_POINTS = new GoogleMapsClient().getInterestPoints();
    }

    public static class CaminoAndaluz {
        public static final String POINTS_FILE_NAME = "camino_andaluz.points";
        public static final String INTEREST_POINTS_FILE_NAME = "";
        public static final List<RoutePlace> INTEREST_POINTS = Collections.emptyList();
    }

    public static class CaminoGijon {
        public static final String POINTS_FILE_NAME = "camino_gijon.points";
        public static final String INTEREST_POINTS_FILE_NAME = "";
        public static final List<RoutePlace> INTEREST_POINTS = Collections.emptyList();
    }

    public static String[] getLinesForFile(String fileName) {

        //Get file from resources folder
        ClassLoader classLoader = (new Ways()).getClass().getClassLoader();
        InputStream stream = classLoader.getResourceAsStream(fileName);
        try {
            if (stream == null) {
                throw new Exception("Cannot find file " + fileName);
            }

            String fileContent = IOUtils.toString(stream, StandardCharsets.UTF_8);
            return fileContent.split("\n");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return new String[0];
    }

}

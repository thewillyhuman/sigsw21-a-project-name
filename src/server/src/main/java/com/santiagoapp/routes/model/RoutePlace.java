package com.santiagoapp.routes.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.maps.model.OpeningHours;
import com.google.maps.model.Photo;

import java.util.Arrays;
import java.util.Objects;

public class RoutePlace {

    private final String name;
    private final double[] coordinates;
    private final double rating;
    private final String status;
    private final String address;
    private final String icon;
    @JsonProperty("opening_hours")
    private final OpeningHours openingHours;
    private final Photo[] photos;
    @JsonProperty("place_id")
    private final String placeId;
    private final String[] types;
    @JsonProperty("user_ratings_total")
    private final int userRatingTotal;
    private final String vicinity;


    public RoutePlace(String name, double[] coordinates, double rating, String status, String address, String icon, OpeningHours openingHours, Photo[] photos, String placeId, String[] types, int userRatingTotal, String vicinity) {
        this.name = name;
        this.coordinates = coordinates;
        this.rating = rating;
        this.status = status;
        this.address = address;
        this.icon = icon;
        this.openingHours = openingHours;
        this.photos = photos;
        this.placeId = placeId;
        this.types = types;
        this.userRatingTotal = userRatingTotal;
        this.vicinity = vicinity;
    }

    public String getName() {
        return name;
    }

    public double[] getCoordinates() {
        return coordinates;
    }

    public double getRating() {
        return rating;
    }

    public String getStatus() {
        return status;
    }

    public String getAddress() {
        return address;
    }

    public String getIcon() {
        return icon;
    }

    public OpeningHours getOpeningHours() {
        return openingHours;
    }

    public Photo[] getPhotos() {
        return photos;
    }

    public String getPlaceId() {
        return placeId;
    }

    public String[] getTypes() {
        return types;
    }

    public int getUserRatingTotal() {
        return userRatingTotal;
    }

    public String getVicinity() {
        return vicinity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoutePlace that = (RoutePlace) o;
        return Double.compare(that.rating, rating) == 0 &&
                userRatingTotal == that.userRatingTotal &&
                Objects.equals(name, that.name) &&
                Arrays.equals(coordinates, that.coordinates) &&
                Objects.equals(status, that.status) &&
                Objects.equals(address, that.address) &&
                Objects.equals(icon, that.icon) &&
                Objects.equals(openingHours, that.openingHours) &&
                Arrays.equals(photos, that.photos) &&
                Objects.equals(placeId, that.placeId) &&
                Arrays.equals(types, that.types) &&
                Objects.equals(vicinity, that.vicinity);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(name, rating, status, address, icon, openingHours, placeId, userRatingTotal, vicinity);
        result = 31 * result + Arrays.hashCode(coordinates);
        result = 31 * result + Arrays.hashCode(photos);
        result = 31 * result + Arrays.hashCode(types);
        return result;
    }

    @Override
    public String toString() {
        return "RoutePlace{" +
                "name='" + name + '\'' +
                ", coordinates=" + Arrays.toString(coordinates) +
                ", rating=" + rating +
                ", status='" + status + '\'' +
                ", address='" + address + '\'' +
                ", icon='" + icon + '\'' +
                ", openningHours='" + openingHours + '\'' +
                ", photos=" + Arrays.toString(photos) +
                ", placeId='" + placeId + '\'' +
                ", types=" + Arrays.toString(types) +
                ", userRatingTotal=" + userRatingTotal +
                ", vicinity='" + vicinity + '\'' +
                '}';
    }
}

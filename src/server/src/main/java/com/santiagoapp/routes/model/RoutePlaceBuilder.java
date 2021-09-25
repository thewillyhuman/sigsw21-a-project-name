package com.santiagoapp.routes.model;

import com.google.maps.model.OpeningHours;
import com.google.maps.model.Photo;

public final class RoutePlaceBuilder {
    private String name;
    private double[] coordinates;
    private double rating;
    private String status;
    private String address;
    private String icon;
    private OpeningHours openingHours;
    private Photo[] photos;
    private String placeId;
    private String[] types;
    private int userRatingTotal;
    private String vicinity;

    private RoutePlaceBuilder() {
    }

    public static RoutePlaceBuilder newBuilder() {
        return new RoutePlaceBuilder();
    }

    public RoutePlaceBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public RoutePlaceBuilder withCoordinates(double[] coordinates) {
        this.coordinates = coordinates;
        return this;
    }

    public RoutePlaceBuilder withRating(double rating) {
        this.rating = rating;
        return this;
    }

    public RoutePlaceBuilder withStatus(String status) {
        this.status = status;
        return this;
    }

    public RoutePlaceBuilder withAddress(String address) {
        this.address = address;
        return this;
    }

    public RoutePlaceBuilder withIcon(String icon) {
        this.icon = icon;
        return this;
    }

    public RoutePlaceBuilder withOpeningHours(OpeningHours openingHours) {
        this.openingHours = openingHours;
        return this;
    }

    public RoutePlaceBuilder withPhotos(Photo[] photos) {
        this.photos = photos;
        return this;
    }

    public RoutePlaceBuilder withPlaceId(String placeId) {
        this.placeId = placeId;
        return this;
    }

    public RoutePlaceBuilder withTypes(String[] types) {
        this.types = types;
        return this;
    }

    public RoutePlaceBuilder withUserRatingTotal(int userRatingTotal) {
        this.userRatingTotal = userRatingTotal;
        return this;
    }

    public RoutePlaceBuilder withVicinity(String vicinity) {
        this.vicinity = vicinity;
        return this;
    }

    public RoutePlace build() {
        return new RoutePlace(name, coordinates, rating, status, address, icon, openingHours, photos, placeId, types, userRatingTotal, vicinity);
    }
}

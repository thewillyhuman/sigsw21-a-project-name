package com.santiagoapp.users;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class UsersGetRequest {

    @JsonProperty("x_position")
    private float xPosition;

    @JsonProperty("y_position")
    private float yPosition;


    public UsersGetRequest(float xPosition, float yPosition) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    public float getxPosition() {
        return xPosition;
    }

    public float getyPosition() {
        return yPosition;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsersGetRequest that = (UsersGetRequest) o;
        return Float.compare(that.xPosition, xPosition) == 0 && Float.compare(that.yPosition, yPosition) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(xPosition, yPosition);
    }

    @Override
    public String toString() {
        return "UsersGetRequest{" +
                "xPosition=" + xPosition +
                ", yPosition=" + yPosition +
                '}';
    }
}

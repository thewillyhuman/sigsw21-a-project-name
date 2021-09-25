package com.santiagoapp.users;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Arrays;

public class UsersGetRequest {

    @JsonProperty("user_position")
    private double[] position;

    public UsersGetRequest(double[] position) {
        this.position = position;
    }

    public double[] getPosition() {
        return position;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsersGetRequest that = (UsersGetRequest) o;
        return Arrays.equals(position, that.position);
    }

    @Override
    public int hashCode() {
        return Arrays.hashCode(position);
    }

    @Override
    public String toString() {
        return "UsersGetRequest{" +
                "position=" + Arrays.toString(position) +
                '}';
    }
}

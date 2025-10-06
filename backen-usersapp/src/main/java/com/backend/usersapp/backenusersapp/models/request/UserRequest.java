package com.backend.usersapp.backenusersapp.models.request;

import com.backend.usersapp.backenusersapp.models.IUser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserRequest implements IUser {

    @NotBlank
    private String username;
    @NotBlank
    @Email
    private String email;

    private boolean admin;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    @Override
    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
}

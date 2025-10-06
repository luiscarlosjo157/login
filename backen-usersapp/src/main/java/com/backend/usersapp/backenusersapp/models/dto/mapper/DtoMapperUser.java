package com.backend.usersapp.backenusersapp.models.dto.mapper;

import com.backend.usersapp.backenusersapp.models.dto.UserDto;
import com.backend.usersapp.backenusersapp.models.entity.User;

public class DtoMapperUser {


    private User user;
    private DtoMapperUser() {
    }

    public static DtoMapperUser builder(){
        return new DtoMapperUser();
    }

    public DtoMapperUser setUser(User user){
        this.user = user;
        return this;
    }

    public UserDto build(){
        if (user == null){
            throw new RuntimeException("Debe pasar el entiry user");
        }

        boolean isAdmin = user.getRoles().stream().anyMatch( r -> "ROLE_ADMIN".equals(r.getName()));
        UserDto userDto = new UserDto(this.user.getId(), this.user.getUsername(), this.user.getEmail(), isAdmin);
        return userDto;
    }
}

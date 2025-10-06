package com.backend.usersapp.backenusersapp.services;

import com.backend.usersapp.backenusersapp.models.dto.UserDto;
import com.backend.usersapp.backenusersapp.models.entity.User;
import com.backend.usersapp.backenusersapp.models.request.UserRequest;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<UserDto> findAll();

    Optional<UserDto> findById(Long id);

    UserDto save(User user);

    Optional<UserDto> update(UserRequest user, Long id);
    void remove(Long id);
}

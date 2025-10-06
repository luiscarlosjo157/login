package com.backend.usersapp.backenusersapp.repositories;

import com.backend.usersapp.backenusersapp.models.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);

    /* esta es otra forma de hacer consultas con jpa
    @Query("select u from User u where.username=?1")
    Optional<User> getUserByUsername(String username);
     */
}

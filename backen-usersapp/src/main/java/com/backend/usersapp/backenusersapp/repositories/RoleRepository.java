package com.backend.usersapp.backenusersapp.repositories;

import com.backend.usersapp.backenusersapp.models.entity.Role;
import org.springframework.data.repository.CrudRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findByName(String name);

}

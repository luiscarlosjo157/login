package com.backend.usersapp.backenusersapp.services;

import com.backend.usersapp.backenusersapp.models.IUser;
import com.backend.usersapp.backenusersapp.models.dto.UserDto;
import com.backend.usersapp.backenusersapp.models.dto.mapper.DtoMapperUser;
import com.backend.usersapp.backenusersapp.models.entity.Role;
import com.backend.usersapp.backenusersapp.models.entity.User;
import com.backend.usersapp.backenusersapp.models.request.UserRequest;
import com.backend.usersapp.backenusersapp.repositories.RoleRepository;
import com.backend.usersapp.backenusersapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService {


    @Autowired
    private UserRepository repository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    @Transactional(readOnly = true)
    public List<UserDto> findAll() {

        List<User> users =  (List<User>) repository.findAll();

        return users
                .stream()
                .map(u -> DtoMapperUser.builder().setUser(u).build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserDto> findById(Long id) {
        return repository.findById(id).map(u -> DtoMapperUser
                .builder().setUser(u).build());
        /*las lineas anterioeres remplazan todo el siquiente codigo
        Optional<User> o = repository.findById(id);
        if (o.isPresent()){
            return Optional.of(
                    DtoMapperUser
                            .builder()
                            .setUser(o.orElseThrow())
                            .build()
            );
        }
        return Optional.empty();

         */
    }

    @Override
    @Transactional
    public UserDto save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(getRoles(user));
        return DtoMapperUser.builder().setUser(repository.save(user)).build();
    }

    @Override
    @Transactional
    public Optional<UserDto> update(UserRequest user, Long id) {
        Optional<User> o = repository.findById(id);
        User userOptional= null;
        if (o.isPresent()){
            User userDb = o.orElseThrow();
            userDb.setRoles(getRoles(user));
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());
            userOptional = repository.save(userDb);
        }
        return Optional.ofNullable(DtoMapperUser.builder().setUser(userOptional).build());
    }


    @Override
    @Transactional
    public void remove(Long id) {
        repository.deleteById(id);
    }

    private List<Role> getRoles(IUser user){
        Optional<Role> ou = roleRepository.findByName("ROLE_USER");
        List<Role> roles = new ArrayList<>();
        if (ou.isPresent()){
            roles.add(ou.orElseThrow());
        }

        if (user.isAdmin()){
            Optional<Role> oa = roleRepository.findByName("ROLE_ADMIN");
            if (oa.isPresent()){
                roles.add(oa.orElseThrow());
            }
        }
        return roles;
    }
}

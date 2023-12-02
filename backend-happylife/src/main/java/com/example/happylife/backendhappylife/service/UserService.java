package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.controller.auth.UserResDTO;
import com.example.happylife.backendhappylife.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {
    public List<UserResDTO> getUsers();
    public User addUser(User user);

    public UserResDTO getUserById(UserResDTO user, String id);
//    public User deteleUser(String id);
//    public User updateUser(String id, User user);

}

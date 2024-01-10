package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.User;

import java.util.List;

public interface UserService {
    public List<UserResDTO> getUsers();
    public User addUser(User user);

    public UserResDTO getUserById(UserResDTO user, String id);

    //User getUserById(User user, String id);
//    public User deteleUser(String id);
//    public User updateUser(String id, User user);

}

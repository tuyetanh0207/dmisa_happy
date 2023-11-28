package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.entity.User;

import java.util.List;

public interface UserService {
    public List<User> getUsers();
    public User addUser(User user);
//    public User deteleUser(String id);
//    public User updateUser(String id, User user);

}

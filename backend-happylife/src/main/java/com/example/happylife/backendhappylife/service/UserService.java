package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.User;
import org.bson.types.ObjectId;

import java.util.List;

public interface UserService {
    public List<UserResDTO> getUsers();
    public User addUser(User user);

    public UserResDTO getUserById(UserResDTO user, ObjectId id);

    //    @Override
    //    public User deteleUser(String id) {
    //        User user = userRepo.findById(id).get();
    //        userRepo.delete(user);
    //        return user;
    //    }
    //
    User updateUser(ObjectId userId, User user);

    //User getUserById(User user, String id);
//    public User deteleUser(String id);
//    public User updateUser(String id, User user);

}

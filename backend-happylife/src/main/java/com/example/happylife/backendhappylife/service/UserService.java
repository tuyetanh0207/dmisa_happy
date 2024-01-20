package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.User;
import org.bson.types.ObjectId;

import java.util.List;

public interface UserService {
    public List<UserResDTO> getUsers();

    //Service for Customer
    //Service for Customer
    UserResDTO updateUser(ObjectId userId, UserResDTO userResDTO, UserResDTO userRequest);

    public UserResDTO getUserById(UserResDTO user, ObjectId id);

    UserResDTO addUser(UserResDTO userResDTO);

    //Service for image and files
    UserResDTO updateUserHealthStatusFileOrImage(ObjectId userId,
                                                 UserResDTO userVar,
                                                 List<String> uploadedUrls);

    //    @Override
    //    public User deteleUser(String id) {
    //        User user = userRepo.findById(id).get();
    //        userRepo.delete(user);
    //        return user;
    //    }
    //

    //User getUserById(User user, String id);
//    public User deteleUser(String id);
//    public User updateUser(String id, User user);

}

package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.repo.UserRepo;
import com.example.happylife.backendhappylife.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public User addUser(User user) {
        return userRepo.save(user);
    }

//    @Override
//    public User deteleUser(String id) {
//        User user = userRepo.findById(id).get();
//        userRepo.delete(user);
//        return user;
//    }
//
//    @Override
//    public User updateUser(String id, User user) {
//        User oldUser= userRepo.findById(id).get();
//        oldUser.setId(user.getId());
//        oldUser.setFullName(user.getFullName());
//        userRepo.save(oldUser);
//        return oldUser;
//    }
}

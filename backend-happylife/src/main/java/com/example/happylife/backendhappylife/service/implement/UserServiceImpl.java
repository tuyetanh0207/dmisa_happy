package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.UserRepo;
import com.example.happylife.backendhappylife.service.MyService;
import com.example.happylife.backendhappylife.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Date;

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
        if (user.getFullName() == null || user.getFullName().isEmpty()) {
            throw new UserCreationException("Full name is required.");
        }
        if (user.getGender() == null || !(user.getGender().equals("Male") || user.getGender().equals("Female"))) {
            throw new UserCreationException("Invalid gender. Please specify 'Male' or 'Female'.");
        }
        if (!MyService.isValidPhoneNumber(user.getPhoneNumber())||user.getPhoneNumber().length()!=10) {
            throw new UserCreationException("Invalid phone number format.");
        }
        try {
            Instant instantNow = Instant.now();

            user.setCreatedAt(instantNow);
            user.setUpdatedAt(instantNow);
            return userRepo.save(user);
        }
        catch (Exception e) {
            throw new UserCreationException("Error creating user:" + e.getMessage());

        }

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


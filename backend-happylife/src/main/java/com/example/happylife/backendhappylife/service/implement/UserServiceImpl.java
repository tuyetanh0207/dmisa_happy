package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.UserRepo;
import com.example.happylife.backendhappylife.service.MyService;
import com.example.happylife.backendhappylife.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public List<UserResDTO> getUsers() {
        List<User> users = userRepo.findAll();
        List<UserResDTO> userResDTOs = users.stream()
                .map(User::convertFromUserToUserResDTO)
                .collect(Collectors.toList());
        return userResDTOs;
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
        if (userRepo.findByPhoneNumber(user.getPhoneNumber()).isPresent()){
            throw new UserCreationException("Phone number is already existed.");
        }
        try {
            Instant instantNow = Instant.now();
            user.setRole(Role.CUSTOMER);
            user.setCreatedAt(instantNow);
            user.setUpdatedAt(instantNow);
            return userRepo.save(user);
        }
        catch (Exception e) {
            throw new UserCreationException("Error creating user:" + e.getMessage());

        }

    }

    @Override
    public UserResDTO getUserById(UserResDTO user, String id) {
        // check if user._id == id, it means a user is getting their infomation
        try {
            if (user.getId().equals(id)) {
                Optional<User> userVar = userRepo.findById(id);
                return userVar.get().convertFromUserToUserResDTO();
            }
            // check if getting user is manager, DBA or accountant, it means they can get information of any user
            if (user.getRole() == Role.INSUARANCE_MANAGER || user.getRole() == Role.ACCOUNTANT || user.getRole() == Role.DBA) {
                Optional<User> userVar = userRepo.findById(id);
                return userVar.get().convertFromUserToUserResDTO();
            }
            throw new UserCreationException("Error getting user information, you not have permission, please sign in with permitted account to do it.");
        } catch (Exception e) {

            throw new UserCreationException("Error getting user information: " + e.getMessage());
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

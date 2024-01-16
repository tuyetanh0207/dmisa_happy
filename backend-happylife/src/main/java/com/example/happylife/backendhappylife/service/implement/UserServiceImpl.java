package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.UserRepo;
import com.example.happylife.backendhappylife.service.MyService;
import com.example.happylife.backendhappylife.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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
    public UserResDTO getUserById(UserResDTO user, ObjectId id) {
        // check if user._id == id, it means a user is getting their infomation
        try {
            if (user.getId().equals(id.toString())) {
                Optional<User> userVar = userRepo.findById(id);
                System.out.println("Error : true");
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


    //Service for Customer
    @Override
    public UserResDTO updateUser(ObjectId userId, UserResDTO userResDTO, UserResDTO userRequest) {
        User user = new User().convertResToUser(userResDTO);
        User userRequestVar = new User().convertResToUser(userRequest);
        try{
            if (userRequestVar.getId().equals(userId)) {
                User existingUser = userRepo.findById(userId)
                        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
                if (user.getFullName() != null) { existingUser.setFullName(user.getFullName());}
                if (user.getDOB() != null) {existingUser.setDOB(user.getDOB());}
                if(user.getGender() != null) { existingUser.setGender(user.getGender());}
                if (user.getPhoneNumber() != null) {existingUser.setPhoneNumber(user.getPhoneNumber());}
                if(user.getCitizenId() != null) {existingUser.setCitizenId(user.getCitizenId());}
                if (user.getEmail() != null) {existingUser.setEmail(user.getEmail());}
                if (user.getAddress() != null) {existingUser.setAddress(user.getAddress());}
                if (user.getHealthStatus() != null) {existingUser.setHealthStatus(user.getHealthStatus());}
                Instant instantNow = Instant.now();
                existingUser.setUpdatedAt(instantNow);
                userRepo.save(existingUser);
                return existingUser.convertFromUserToUserResDTO();
            }
            else{
                throw new UserCreationException("User don't have permission to change the information");

            }
        } catch (Exception e) {
            throw new UserCreationException("Error updating Contract: " + e.getMessage());
        }

    }
    @Override
    public UserResDTO addUser(UserResDTO userResDTO) {
        User user = new User().convertResToUser(userResDTO);
        try {
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
            Instant instantNow = Instant.now();
            user.setRole(Role.CUSTOMER);
            user.setCreatedAt(instantNow);
            user.setUpdatedAt(instantNow);
            userRepo.save(user);
            return user.convertFromUserToUserResDTO();
        }
        catch (Exception e) {
            throw new UserCreationException("Error creating user:" + e.getMessage());

        }

    }
}

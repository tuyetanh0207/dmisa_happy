package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.DTO.auth.AuthenticationRequest;
import com.example.happylife.backendhappylife.DTO.auth.AuthenticationResponse;
import com.example.happylife.backendhappylife.controller.auth.AuthenticationService;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    private final AuthenticationService service;

    public UserController(AuthenticationService service) {
        this.service = service;
    }
    // Dangerous
    @PostMapping("/auth/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request
    ){
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/auth/signin")
    public ResponseEntity<AuthenticationResponse> authentication(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authentication(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable ObjectId id, HttpServletRequest request) {
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();
        if(user.getRole() == Role.CUSTOMER ||
                user.getRole() == Role.INSUARANCE_MANAGER ||
                user.getRole() == Role.ACCOUNTANT)
        {
            return ResponseEntity.ok(userService.getUserById(user, id));
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
//        System.out.println("path id");
//        System.out.println(id);
//        System.out.println("user infor");
//        System.out.println(user);
    }
    @GetMapping("")
    public List<UserResDTO> getUsers() {

        return userService.getUsers();
    }
    @PostMapping("/create")
    public ResponseEntity<?> insert(@RequestBody UserResDTO user){
        return ResponseEntity.ok(userService.addUser(user));
    }
    //API for Customer
    @PutMapping("/update")
    public ResponseEntity<?> update(HttpServletRequest request,
                                                   @PathVariable ObjectId userId,
                                                   @RequestBody UserResDTO user){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO userRequest = userVar.convertFromUserToUserResDTO();
        if(userVar.getRole() == Role.CUSTOMER ||
                userVar.getRole() == Role.INSUARANCE_MANAGER ||
                userVar.getRole() == Role.ACCOUNTANT)
        {
            return ResponseEntity.ok(userService.updateUser(userId, user, userRequest));
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    }

}

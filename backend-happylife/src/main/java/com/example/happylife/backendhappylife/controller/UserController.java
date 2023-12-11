package com.example.happylife.backendhappylife.controller;

<<<<<<< Updated upstream
=======
import com.example.happylife.backendhappylife.DTO.UserResDTO;
import com.example.happylife.backendhappylife.DTO.auth.AuthenticationRequest;
import com.example.happylife.backendhappylife.DTO.auth.AuthenticationResponse;
import com.example.happylife.backendhappylife.service.AuthenticationService;
>>>>>>> Stashed changes
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< Updated upstream
=======
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
>>>>>>> Stashed changes
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/")
    public List<User> getUsers(){
        return userService.getUsers();
    }
    @PostMapping("/create")
    public User insert(@RequestBody User user){
        return userService.addUser(user);
    }
    /*

     @PutMapping("/update")
     public User update(@PathVariable String id, @RequestBody User user){
        return userService.updateUser(id, user);
     }
     @DeleteMapping
     public User delete(@PathVariable String id){
        return userService.deleteUser(id);
     }

    * */

}

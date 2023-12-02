package com.example.happylife.backendhappylife.controller.auth;

import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    private final AuthenticationService service;

    public UserController(AuthenticationService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResDTO> getUserById(@PathVariable String id, HttpServletRequest request) {
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();
//        System.out.println("path id");
//        System.out.println(id);
//        System.out.println("user infor");
//        System.out.println(user);
        return ResponseEntity.ok(userService.getUserById(user, id));
    }

    @GetMapping("")
    public List<UserResDTO> getUsers() {

        return userService.getUsers();
    }
    @PostMapping("/create")
    public User insert(@RequestBody User user){
        return userService.addUser(user);
    }
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

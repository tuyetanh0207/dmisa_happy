package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.auth.AuthenticationRequest;
import com.example.happylife.backendhappylife.DTO.auth.AuthenticationResponse;
import com.example.happylife.backendhappylife.config.JwtService;
import com.example.happylife.backendhappylife.entity.Role;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.UserRepo;
import com.example.happylife.backendhappylife.service.MyService;
import lombok.RequiredArgsConstructor;
import com.example.happylife.backendhappylife.entity.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private  final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(User request) {
        if (request.getFullName() == null) {
            throw new UserCreationException("Full name is required.");
        }
        if (request.getGender() == null || !(request.getGender().equals("Male") || request.getGender().equals("Female"))) {
            throw new UserCreationException("Invalid gender. Please specify 'Male' or 'Female'.");
        }
        if (request.getPhoneNumber()==null || !MyService.isValidPhoneNumber(request.getPhoneNumber())||request.getPhoneNumber().length()!=10 || userRepo.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new UserCreationException("Invalid phone number format or this phone number has already existed.");
        }
        if(request.getEmail()==null || !MyService.isValidEmail(request.getEmail())){
            throw new UserCreationException("Invalid email format or this email has already existed.");
        }
        if(request.getDOB()==null ){
            throw new UserCreationException("Date of birth is required.");
        }
        if(request.getPassword()==null ){
            throw new UserCreationException("Password is required.");
        }
//        if(request.getAddress()==null ){
//            throw new UserCreationException("Address is required.");
//        }
        try {
            Instant instantNow = Instant.now();

            var user = User.builder()
                    .phoneNumber(request.getPhoneNumber())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .fullName(request.getFullName())
                    .DOB(request.getDOB())
                    .address(request.getAddress())
                    .createdAt(instantNow)
                    .updatedAt(instantNow)
                    .role(Role.CUSTOMER)
                    .build();
            userRepo.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .userInfo(user.convertFromUserToUserResDTO())
                    .build();

        }
        catch (Exception e) {
            throw new UserCreationException("Error creating user:" + e.getMessage());

        }

    }


    public AuthenticationResponse authentication(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(

                    new UsernamePasswordAuthenticationToken(
                            request.getPhoneNumber(),
                            request.getPassword()
                    )
            );
            var user = userRepo.findByPhoneNumber(request.getPhoneNumber())
                    .orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)

                    .userInfo(user.convertFromUserToUserResDTO())
                    .build();
        } catch (AuthenticationException e) {
            // Handle authentication failure
            System.out.println(e);
        }

        return null;
    }
}

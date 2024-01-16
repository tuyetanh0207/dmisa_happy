package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.ContractService;
import com.example.happylife.backendhappylife.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    //API for Customer
    @GetMapping("/{userId}")
    public ResponseEntity<?> getNotificationsOfUserById(HttpServletRequest request,
                                                        @PathVariable ObjectId userId){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO userRes = userVar.convertFromUserToUserResDTO();
        if(userRes.getRole() == Role.CUSTOMER || userRes.getRole() == Role.INSUARANCE_MANAGER) {
            List<NotificationResDTO> notificationResDTOS = notificationService.getNotificationsById(userRes, userId);
            return ResponseEntity.ok(notificationResDTOS);
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    }

}

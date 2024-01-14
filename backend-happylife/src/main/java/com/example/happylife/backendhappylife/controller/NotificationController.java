package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.ContractService;
import com.example.happylife.backendhappylife.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("")
    public ResponseEntity<List<NotificationResDTO>> getNotifications(HttpServletRequest request){
        User userVar = (User) request.getAttribute("userDetails");
        List<NotificationResDTO> notificationResDTOS = notificationService.getNotifications(userVar).stream()
                .map(registration -> registration.convertToNotificationResDTO())
                .collect(Collectors.toList());
        return ResponseEntity.ok(notificationResDTOS);
    }

}

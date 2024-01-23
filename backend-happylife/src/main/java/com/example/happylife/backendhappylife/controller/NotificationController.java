package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationListDTO;
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

    //API for system
    //@PostMapping("/create/{userId}")
    //API for Customer
    @GetMapping("/{userId}")
    public ResponseEntity<?> getNotificationsOfUserById(HttpServletRequest request,
                                                        @PathVariable ObjectId userId){
        try {
            User userVar = (User) request.getAttribute("userDetails");
            UserResDTO userRes = userVar.convertFromUserToUserResDTO();
            if(userRes.getRole() == Role.CUSTOMER || userRes.getRole() == Role.INSUARANCE_MANAGER) {
                List<NotificationResDTO> notificationResDTOS = notificationService.getNotificationsById(userRes, userId);
                return ResponseEntity.ok(notificationResDTOS);
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    }

    @PutMapping("/updateAllStatusOfUser")
    public ResponseEntity<?> updateAllStatusOfUser(HttpServletRequest request){
        try {
            User userVar = (User) request.getAttribute("userDetails");
            UserResDTO userRes = userVar.convertFromUserToUserResDTO();
            if(userRes.getRole() == Role.CUSTOMER ||
                    userRes.getRole() == Role.INSUARANCE_MANAGER ||
                    userRes.getRole() == Role.ACCOUNTANT) {
                List<NotificationResDTO> notificationResDTOS = notificationService.updateAllStatusOfNotiUser(userRes);
                return ResponseEntity.ok(notificationResDTOS);
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    }
    @PutMapping("/{notiId}/updateStatus")
    public ResponseEntity<?> updateStatusofNoti(HttpServletRequest request,
                                                @PathVariable ObjectId notiId){
        try {
            User userVar = (User) request.getAttribute("userDetails");
            UserResDTO userRes = userVar.convertFromUserToUserResDTO();
            if(userRes.getRole() == Role.CUSTOMER ||
                    userRes.getRole() == Role.INSUARANCE_MANAGER ||
                    userRes.getRole() == Role.ACCOUNTANT) {
                NotificationResDTO notificationRes = notificationService.updateStatusOfNotiUser(userRes, notiId);
                return ResponseEntity.ok(notificationRes);
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    }
    @GetMapping ("/getNotiStatusFalseOfUser")
    public ResponseEntity<?> getNotiStatusFalseOfUser(HttpServletRequest request){
        try {
            User userVar = (User) request.getAttribute("userDetails");
            UserResDTO userRes = userVar.convertFromUserToUserResDTO();
            if(userRes.getRole() == Role.CUSTOMER ||
                    userRes.getRole() == Role.INSUARANCE_MANAGER ||
                    userRes.getRole() == Role.ACCOUNTANT) {
                NotificationListDTO notificationListDTO = notificationService.getListOfFalseStatus(userRes);
                return ResponseEntity.ok(notificationListDTO);
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    }
}

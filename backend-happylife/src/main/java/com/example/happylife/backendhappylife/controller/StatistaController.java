package com.example.happylife.backendhappylife.controller;


import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaCreateDTO;
import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaDashboardResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.service.StatistaService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})
@RestController
@RequestMapping("/api/v1/statista")
public class StatistaController {

    private final StatistaService statistaService;

    @Autowired
    public StatistaController(StatistaService statistaService){
        this.statistaService = statistaService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getStatistaDashboardOfOneYear(
            HttpServletRequest request,
            @RequestParam(required = false) Integer year
    ) {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if ( userResDTO.getRole()==Role.ACCOUNTANT || userResDTO.getRole()==Role.INSUARANCE_MANAGER){
            try {
                StatistaDashboardResDTO statistaDashboardResDTO = statistaService.getStatistaInDashboardByYear(year);
                return ResponseEntity.ok(statistaDashboardResDTO);

            } catch (Exception e) {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Error getting statista of this year.");
            }


        } else {
            // return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Param is invalid");
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Your account is not of staff.");
        }
    }
    @PostMapping("/create")
    public  ResponseEntity<?> createStatista(
            HttpServletRequest request,
            @RequestBody StatistaCreateDTO statistaCreateDTO
            ){
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        try {
            if (user.getRole() == Role.ACCOUNTANT ){
                return ResponseEntity.ok(statistaService.createStatista(statistaCreateDTO));
            }
            else {
                throw new UserCreationException("You need authenticated account to access this infomation.");
            }
        }
        catch (Exception e) {
            throw new UserCreationException("Error getting registrations: " + e.getMessage());
        }
    }
}

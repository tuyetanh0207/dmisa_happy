package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegistrationDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.RegistrationService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})
@RestController
@RequestMapping("/api/v1/registrations")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;
    @GetMapping("")
    public List<Registration> getRegistrations(HttpServletRequest request){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();
        return registrationService.getRegistrations(user);


    }
    @PostMapping("/create")
    public Registration createRegistration(HttpServletRequest request, @RequestBody RegisCreateDTO regisCreateDTO){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();
        return ResponseEntity.ok(registrationService.addRegistration(user, regisCreateDTO.getCustomerInfo(), regisCreateDTO.getProductInfo())).getBody();
    }
    @PutMapping("/{id}/update-status")
    public Registration updateRegisStatus(@PathVariable ObjectId id, HttpServletRequest request, @RequestBody RegistrationDTO info){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();
        return ResponseEntity.ok(registrationService.updateRegisStatus(user, id, info.getApprovalStatus(), info.getMessage())).getBody();
    }

}

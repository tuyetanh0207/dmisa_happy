package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegistrationDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.RegistrationService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})
@RestController
@RequestMapping("/api/v1/registrations")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;
    @GetMapping("")
    public ResponseEntity<List<RegisResDTO>> getRegistrations(HttpServletRequest request){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();
        List<RegisResDTO> regisResDTOS = registrationService.getRegistrations(user).stream()
                .map(registration -> registration.convertToRegisResDTO())
                .collect(Collectors.toList());
        return ResponseEntity.ok(regisResDTOS);
    }

    @PostMapping("/create")
    public ResponseEntity<RegisCreateDTO> createRegistration(HttpServletRequest request, @RequestBody RegisCreateDTO regisCreateDTO){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();

        Registration regis = new Registration();
        Registration regisCreated = regis.convertCreToRegistrations(regisCreateDTO);
        Registration savedRegis = registrationService.addRegistration(user,regisCreated);
        RegisCreateDTO regisCreDTO = savedRegis.convertToRegisCreateDTO();
        return ResponseEntity.ok(regisCreDTO);
    }
    @PutMapping("/{id}/update-status")
    public ResponseEntity<RegisUpdateDTO> updateRegisStatus(@PathVariable ObjectId id,
                                                            HttpServletRequest request,
                                                            @RequestBody RegisUpdateDTO regisUpdateDTO){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();

        Registration regis = new Registration();
        Registration regisUpdated = regis.convertUpdToRegistrations(regisUpdateDTO);
        Registration savedRegis = registrationService.updateRegisStatus(user,id,regisUpdated);
        RegisUpdateDTO regisUpdDTO = savedRegis.convertToRegisUpdateDTO();
        return ResponseEntity.ok(regisUpdDTO);
    }
}

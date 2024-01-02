package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.*;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.RegistrationService;
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
@RequestMapping("/api/v1/registrations")
public class RegistrationController {


    private final RegistrationService registrationService;


    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }
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
                                                            @RequestBody RegisUpdateStatusDTO regisUpdateDTO){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();


        Registration savedRegis = registrationService.updateRegisStatus(user,id,regisUpdateDTO);
        RegisUpdateDTO regisUpdDTO = savedRegis.convertToRegisUpdateDTO();
        return ResponseEntity.ok(regisUpdDTO);
    }
    @GetMapping("/enroll")
    public ResponseEntity<?> getEnrollOfPlan(
            HttpServletRequest request,
            @RequestParam(required = false) String planId,
            @RequestParam(required = false) String status
    )
    {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if (planId == null && status == null) {
            return ResponseEntity.badRequest().build();
        }
        List<RegisResDTO> enrollments;
        System.out.println("planid");
        System.out.println(planId);
        ObjectId planObjectId;
        if(planId!=null){
            System.out.println("planid object kk");
            planObjectId = new ObjectId(planId);
            System.out.println("planid object kkkk");
            System.out.println(planObjectId);
            if ( status != null) {
                // Both planId and status are provided
                enrollments = registrationService.getEnrollOfPlan(userResDTO,planObjectId, status);
                return ResponseEntity.ok(enrollments);
            }
        }



        // Call the service method to retrieve enrollments based on planId and status

//        else if (planId != null) {
//            // Only planId is provided
//            enrollments = registrationService.getEnrollmentsByPlanId(planId);
//        } else {
//            // Only status is provided
//            enrollments = registrationService.getEnrollmentsByStatus(status);
//        }

        return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Param is invalid");
    }
}

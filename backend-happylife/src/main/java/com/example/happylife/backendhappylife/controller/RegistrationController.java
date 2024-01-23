package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.*;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.FireBaseService;
import com.example.happylife.backendhappylife.service.RegistrationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})
@RestController
@RequestMapping("/api/v1/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final FireBaseService firebaseStorageService;
    @Autowired
    public RegistrationController(RegistrationService registrationService, FireBaseService firebaseStorageService) {
        this.registrationService = registrationService;
        this.firebaseStorageService = firebaseStorageService;
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
            @RequestParam(required = false) List<String> status
    )
    {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if (planId == null && status == null) {
            return ResponseEntity.badRequest().build();
        }
        List<RegisResDTO> enrollments;
        System.out.println(planId);
        ObjectId planObjectId;
        if(planId!=null && status!= null){

            planObjectId = new ObjectId(planId);

            System.out.println(planObjectId);
            enrollments = registrationService.getEnrollOfPlan(userResDTO,planObjectId, status);
            return ResponseEntity.ok(enrollments);
        } else if (planId!=null)  {
            planObjectId = new ObjectId(planId);
            // Only planId is provided
            enrollments = registrationService.getAllRegistrationOfOnePlan(userResDTO, planObjectId);
            return ResponseEntity.ok(enrollments);
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Param is invalid");
        }


    }

    //API for Customer
    @GetMapping("/{userId}") //API get toàn bộ một regis theo userId
    public ResponseEntity<?> getByUserId(HttpServletRequest request,
                                         @PathVariable ObjectId userId){
        try {
            User user = (User) request.getAttribute("userDetails");
            UserResDTO userResDTO = user.convertFromUserToUserResDTO();
            if(user.getRole() == Role.CUSTOMER ||
                    user.getRole() == Role.INSUARANCE_MANAGER ||
                    user.getRole() == Role.ACCOUNTANT)
            {
                return ResponseEntity.ok(registrationService.getRegisByUserId(userResDTO,userId));
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    }
    @GetMapping("/{regisId}/getById") //API get 1 regis của một user thông qua regisId
    public ResponseEntity<?> getByRegisId(HttpServletRequest request,
                                         @PathVariable ObjectId regisId){
        try {
            User user = (User) request.getAttribute("userDetails");
            UserResDTO userResDTO = user.convertFromUserToUserResDTO();
            if(user.getRole() == Role.CUSTOMER ||
                    user.getRole() == Role.INSUARANCE_MANAGER ||
                    user.getRole() == Role.ACCOUNTANT)
            {
                return ResponseEntity.ok(registrationService.getRegisByIdRegis(userResDTO,regisId));
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    }
    @PostMapping("/create")
    public ResponseEntity<?> createRegistration(HttpServletRequest request,
                                                @RequestBody RegisCreateDTO regisCreateDTO){
        try {
            User userVar = (User) request.getAttribute("userDetails");
            UserResDTO userRes = userVar.convertFromUserToUserResDTO();
            if(userRes.getRole() == Role.CUSTOMER) {
                return ResponseEntity.ok(registrationService.addRegistration(regisCreateDTO));
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    }
    @PutMapping(value = "/update/{regisId}/image-docUrl", consumes = "multipart/form-data") // Update Regis theo regisId các image ở DocumentURl
    public ResponseEntity<?> updateRegisImageDocUrl(@PathVariable ObjectId regisId,
                                                    @RequestParam("fileCounts") String fileCounts,
                                                    @RequestParam("files") MultipartFile[] files) throws IOException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<SectionFileCount> _fileCounts = objectMapper.readValue(fileCounts, new TypeReference<List<SectionFileCount>>() {});
            // Lưu các URL của file sau khi upload
            List<String> uploadedUrls = firebaseStorageService.uploadImages(files);
            // Cập nhật thông tin vào Regis và lưu
            RegisResDTO savedRegis = registrationService.updateRegisImageOrFileDocUrl(regisId,uploadedUrls,_fileCounts);
            return ResponseEntity.ok(savedRegis);
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    };
    @PutMapping(value = "/update/{regisId}/files-docUrl", consumes = "multipart/form-data")
    public ResponseEntity<?> updateRegisFileDocUrl(@PathVariable ObjectId regisId,
                                                   @RequestParam("fileCounts") String fileCounts,
                                                   @RequestParam("files") MultipartFile[] files) throws IOException {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<SectionFileCount> _fileCounts = objectMapper.readValue(fileCounts, new TypeReference<List<SectionFileCount>>() {});
            // Lưu các URL của file sau khi upload
            List<String> uploadedUrls = firebaseStorageService.uploadFiles(files);
            // Cập nhật thông tin vào Regis và lưu
            RegisResDTO savedRegis = registrationService.updateRegisImageOrFileDocUrl(regisId,uploadedUrls,_fileCounts);
            return ResponseEntity.ok(savedRegis);
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    };
}

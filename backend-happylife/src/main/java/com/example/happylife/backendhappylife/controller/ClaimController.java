package com.example.happylife.backendhappylife.controller;


import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateStaffDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateStatusRes;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.DTO.auth.AuthenticationResponse;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.ClaimService;
import com.example.happylife.backendhappylife.service.FireBaseService;
import com.example.happylife.backendhappylife.service.RegistrationService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})

@RestController
@RequestMapping("/api/v1/claims")
public class ClaimController {
    @Autowired
    private ClaimService claimService;
    private final FireBaseService firebaseStorageService;
    @Autowired
    public ClaimController(FireBaseService firebaseStorageService) {
        this.firebaseStorageService = firebaseStorageService;
    }

    //API for Manager
    @GetMapping("")
    public ResponseEntity<?> getAllClaims(HttpServletRequest request){
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if (userResDTO.getRole() == Role.INSUARANCE_MANAGER || userResDTO.getRole()==Role.ACCOUNTANT){
            List<ClaimResDTO> claimResDTOs  = claimService.getAllClaim();
            return ResponseEntity.ok(claimResDTOs);
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    }

    @PutMapping("/{claimId}/update-status")
    public ResponseEntity<ClaimResDTO> updateClaimStatus(HttpServletRequest request,
                                                         @PathVariable String claimId,
                                                         @RequestBody ClaimUpdateStatusRes claim){
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        ObjectId objectIdClaimId = new ObjectId(claimId);
        ClaimResDTO claimToSave = claimService.updateClaimStatus(userResDTO, objectIdClaimId, claim.getClaim(), claim.getMessage());
        return ResponseEntity.ok(claimToSave);
    }
    @PutMapping("/staff/{claimId}/update")
    public ResponseEntity<?> updateClaimByStaff(HttpServletRequest request,
                                                @PathVariable String claimId,
                                                @RequestBody ClaimUpdateStaffDTO claimUpdateStaffDTO) {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        ObjectId objectIdClaimId = new ObjectId(claimId);
        if (userResDTO.getRole()==Role.INSUARANCE_MANAGER || userResDTO.getRole()==Role.ACCOUNTANT){
            ClaimResDTO claimToSave = claimService.updateClaimByStaff(userResDTO, objectIdClaimId, claimUpdateStaffDTO);

            return ResponseEntity.ok(claimToSave);
        } else {
           // return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Param is invalid");
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Your account is not of staff.");
        }
    };
    //API for Customer
    @PostMapping("/create") //API tạo mới một claim
    public ResponseEntity<?> addClaim(HttpServletRequest request,
                                      @RequestBody ClaimCreateDTO claimCreateDTO) {
        try {
            User user = (User) request.getAttribute("userDetails");
            UserResDTO userResDTO = user.convertFromUserToUserResDTO();
            if(user.getRole() == Role.CUSTOMER)
            {
                ClaimResDTO savedClaim = claimService.addClaim(claimCreateDTO);
                return ResponseEntity.ok(savedClaim);
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    };

    @GetMapping("/{userId}") //API get toàn bộ một claim theo userId
    public ResponseEntity<?> getByUserId(HttpServletRequest request,
                                         @PathVariable ObjectId userId){
        try {
            User user = (User) request.getAttribute("userDetails");
            UserResDTO userResDTO = user.convertFromUserToUserResDTO();
            System.out.println(userResDTO.getRole());
            System.out.println("Error : " + userResDTO.getId().toString());
            System.out.println(userId.toString());
            if(user.getRole() == Role.CUSTOMER ||
                    user.getRole() == Role.INSUARANCE_MANAGER ||
                    user.getRole() == Role.ACCOUNTANT)
            {
                return ResponseEntity.ok(claimService.getAllClaimByUserId(userResDTO,userId));
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    }
    @GetMapping("/{regisId}/getAllClaimsOfUserByRegis") //API get toàn bộ một claim theo regisId
    public ResponseEntity<?> getAllClaimsOfUserByRegis(HttpServletRequest request,
                                                        @PathVariable ObjectId regisId){
        try {
            User user = (User) request.getAttribute("userDetails");
            UserResDTO userResDTO = user.convertFromUserToUserResDTO();
            if(userResDTO.getRole() == Role.CUSTOMER)
            {

                return ResponseEntity.ok(claimService.getAllClaimByRegisId(regisId,userResDTO));
            }
            else {
                return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
            }
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    }
    //API for upload files and images
    @PutMapping(value = "/update/{claimId}/image-docUrl", consumes = "multipart/form-data") // Update Claim theo claimId các image ở DocumentURl
    public ResponseEntity<?> updateClaimImageDocUrl(//HttpServletRequest request,
                                                    @PathVariable ObjectId claimId,
                                                    @RequestParam("fileCounts") String fileCounts,
                                                    @RequestParam("files") MultipartFile[] files) throws IOException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<SectionFileCount> _fileCounts = objectMapper.readValue(fileCounts, new TypeReference<List<SectionFileCount>>() {});
            // Lưu các URL của file sau khi upload
            List<String> uploadedUrls = firebaseStorageService.uploadImages(files);
            // Cập nhật thông tin vào Claim và lưu
            ClaimResDTO savedClaim = claimService.updateClaimImageOrFileDocUrl(claimId,uploadedUrls,_fileCounts);
            return ResponseEntity.ok(savedClaim);
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    };
    @PutMapping(value = "/update/{claimId}/file-docUrl", consumes = "multipart/form-data") // Update Claim theo claimId các files ở DocumentURl
    public ResponseEntity<?> updateClaimFileDocUrl(@PathVariable ObjectId claimId,
                                                   @RequestParam("fileCounts") String fileCounts,
                                                   @RequestParam("files") MultipartFile[] files) throws IOException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<SectionFileCount> _fileCounts = objectMapper.readValue(fileCounts, new TypeReference<List<SectionFileCount>>() {});
            // Lưu các URL của file sau khi upload
            List<String> uploadedUrls = firebaseStorageService.uploadFiles(files);
            // Cập nhật thông tin vào Claim và lưu
            ClaimResDTO savedClaim = claimService.updateClaimImageOrFileDocUrl(claimId,uploadedUrls,_fileCounts);
            return ResponseEntity.ok(savedClaim);
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(e.getMessage());
        }
    };
}

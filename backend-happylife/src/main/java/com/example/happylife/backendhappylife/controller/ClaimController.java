package com.example.happylife.backendhappylife.controller;


import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateStaffDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateStatusRes;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.ClaimService;
import com.example.happylife.backendhappylife.service.FireBaseService;
import com.example.happylife.backendhappylife.service.RegistrationService;
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
            List<ClaimResDTO> claimResDTOs  = claimService.getAllClaim().stream()
                    .map(claim -> claim.convertClaimToRes())
                    .collect(Collectors.toList());
            return ResponseEntity.ok(claimResDTOs);
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    }
    //API for Manager

    @PutMapping("/{claimId}/update-status")
    public ResponseEntity<ClaimResDTO> updateClaimStatus(HttpServletRequest request,
                                                         @PathVariable String claimId,
                                                         @RequestBody ClaimUpdateStatusRes claim){
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        ObjectId objectIdClaimId = new ObjectId(claimId);
        Claim claimToSave = claimService.updateClaimStatus(userResDTO, objectIdClaimId, claim.getClaim(), claim.getMessage());
        ClaimResDTO claimRes = claimToSave.convertClaimToRes();
        return ResponseEntity.ok(claimRes);
    }
    @PutMapping("/staff/{claimId}/update")
    public ResponseEntity<?> updateClaimByStaff(HttpServletRequest request,
                                                          @PathVariable String claimId,
                                                          @RequestBody ClaimUpdateStaffDTO claimUpdateStaffDTO) {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        ObjectId objectIdClaimId = new ObjectId(claimId);
        if (userResDTO.getRole()==Role.INSUARANCE_MANAGER || userResDTO.getRole()==Role.ACCOUNTANT){
            Claim claimToSave = claimService.updateClaimByStaff(userResDTO, objectIdClaimId, claimUpdateStaffDTO);
            ClaimResDTO claimRes = claimToSave.convertClaimToRes();
            return ResponseEntity.ok(claimRes);
        } else {
           // return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Param is invalid");
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Your account is not of staff.");
        }
    };
    //API for Customer
    @PostMapping("/create") //API tạo mới một claim
    public ResponseEntity<?> addClaim(@RequestBody ClaimCreateDTO claimCreateDTO) {
        ClaimCreateDTO savedClaim = claimService.addClaim(claimCreateDTO);
        ClaimResDTO claimCreatedDTO = new Claim().convertCreToClaim(savedClaim).convertToClaimResDTO();
        return ResponseEntity.ok(claimCreatedDTO);
    };

    @GetMapping("/{userId}") //API get toàn bộ một claim theo userId
    public ResponseEntity<?> getByUserId(HttpServletRequest request,
                                         @PathVariable ObjectId userId){
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if(user.getRole() == Role.CUSTOMER ||
            user.getRole() == Role.INSUARANCE_MANAGER ||
            user.getRole() == Role.ACCOUNTANT)
        {
            return ResponseEntity.ok(claimService.getAllClaimByUserId(userResDTO,userId));
        }
        else {
        return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    }

    //API for upload files and images
    @PutMapping("/update/{claimId}/image-docUrl") // Update Claim theo claimId các image ở DocumentURl
    public ResponseEntity<?> updateClaimImageDocUrl(HttpServletRequest request,
                                                    @PathVariable ObjectId claimId,
                                                    @RequestPart("fileCounts") List<SectionFileCount> fileCounts,
                                                    @RequestPart("files") MultipartFile[] files) throws IOException {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        //if(userResDTO)
        // Lưu các URL của file sau khi upload
        List<String> uploadedUrls = firebaseStorageService.uploadImages(files);
        // Cập nhật thông tin vào Claim và lưu
        ClaimResDTO savedClaim = claimService.updateClaimImageDocUrl(claimId,uploadedUrls,fileCounts);
        return ResponseEntity.ok(savedClaim);
    };
    @PutMapping("/update/{claimId}/file-docUrl") // Update Claim theo claimId các files ở DocumentURl
    public ResponseEntity<?> updateClaimFileDocUrl(@PathVariable ObjectId claimId,
                                                   @RequestPart("fileCounts") List<SectionFileCount> fileCounts,
                                                   @RequestPart("files") MultipartFile[] files) throws IOException {
        // Lưu các URL của file sau khi upload
        List<String> uploadedUrls = firebaseStorageService.uploadFiles(files);
        // Cập nhật thông tin vào Claim và lưu
        ClaimResDTO savedClaim = claimService.updateClaimImageDocUrl(claimId,uploadedUrls,fileCounts);
        return ResponseEntity.ok(savedClaim);
    };
}

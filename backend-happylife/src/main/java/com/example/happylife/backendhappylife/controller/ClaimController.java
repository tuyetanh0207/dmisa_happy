package com.example.happylife.backendhappylife.controller;


import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateStaffDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateStatusRes;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.ClaimService;
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
@RequestMapping("/api/v1/claims")
public class ClaimController {
    @Autowired
    private ClaimService claimService;

    @GetMapping("")
    public ResponseEntity<?> getAllClaims(HttpServletRequest request){
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if (userResDTO.getRole() == Role.INSUARANCE_MANAGER || userResDTO.getRole()==Role.ACCOUNTANT){
            List<ClaimResDTO> claimResDTOs  = claimService.getAllClaim().stream()
                    .map(claim -> claim.convertClaimToRes(claim))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(claimResDTOs);
        } else {
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
        Claim claimToSave = claimService.updateClaimStatus(userResDTO, objectIdClaimId, claim.getClaim(), claim.getMessage());
        ClaimResDTO claimRes = claimToSave.convertClaimToRes(claimToSave);
        return ResponseEntity.ok(claimRes);

    }
    @PostMapping("/create")
    public ResponseEntity<ClaimCreateDTO> addClaim(@RequestBody ClaimCreateDTO claimCreateDTO) {
        Claim claim = new Claim();
        Claim claimCreated = claim.convertCreToClaim(claimCreateDTO);
        Claim savedClaim = claimService.addClaim(claimCreated);
        ClaimCreateDTO claimCreatedDTO = savedClaim.convertToClaimCreateDTO();
        return ResponseEntity.ok(claimCreatedDTO);
    };
    @PutMapping("/staff/{claimId}/update")
    public ResponseEntity<?> updateClaimByStaff(HttpServletRequest request,
                                                          @PathVariable String claimId,
                                                          @RequestBody ClaimUpdateStaffDTO claimUpdateStaffDTO) {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        ObjectId objectIdClaimId = new ObjectId(claimId);
        if (userResDTO.getRole()==Role.INSUARANCE_MANAGER || userResDTO.getRole()==Role.ACCOUNTANT){
            Claim claimToSave = claimService.updateClaimByStaff(userResDTO, objectIdClaimId, claimUpdateStaffDTO);
            ClaimResDTO claimRes = claimToSave.convertClaimToRes(claimToSave);
            return ResponseEntity.ok(claimRes);
        } else {
           // return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Param is invalid");
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("Your account is not of staff.");
        }


    };
}

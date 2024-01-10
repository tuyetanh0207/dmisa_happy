package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.service.ClaimService;
import com.example.happylife.backendhappylife.service.PlanService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<ClaimResDTO>> getAllClaims() {
        List<ClaimResDTO> claimResDTOS = claimService.getAllClaim().stream()
                .map(claim -> claim.convertToClaimResDTO())
                .collect(Collectors.toList());
        return ResponseEntity.ok(claimResDTOS);
    };
    @PostMapping("/create")
    public ResponseEntity<ClaimCreateDTO> addClaim(@RequestBody ClaimCreateDTO claimCreateDTO) {
        Claim claim = new Claim();
        Claim claimCreated = claim.convertCreToClaim(claimCreateDTO);
        Claim savedClaim = claimService.addClaim(claimCreated);
        ClaimCreateDTO claimCreatedDTO = savedClaim.convertToClaimCreateDTO();
        return ResponseEntity.ok(claimCreatedDTO);
    };
}

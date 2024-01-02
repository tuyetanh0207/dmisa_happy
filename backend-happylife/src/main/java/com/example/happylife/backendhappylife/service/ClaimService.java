package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Object.Message;
import org.bson.types.ObjectId;

import java.util.List;

public interface ClaimService {
    Claim addClaim(UserResDTO authUser, Claim claim);
    List<Claim> getAllClaim();
    Claim updateClaimStatus(UserResDTO authUser, ObjectId claimId, ClaimResDTO claim, Message msg);

}

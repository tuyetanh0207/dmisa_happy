package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;

import java.util.List;

public interface ClaimService {
    //Claim addClaim(UserResDTO authUser, Claim claim);

    List<Claim> getAllClaim();

    List<Claim> getAllClaimUser();

    List<Claim> getAllClaimUser(UserResDTO user);

    Claim addClaim(Claim claim);
}

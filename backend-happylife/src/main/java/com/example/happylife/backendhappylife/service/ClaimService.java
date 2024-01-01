package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;

public interface ClaimService {
    Claim addClaim(UserResDTO authUser, Claim claim);
}

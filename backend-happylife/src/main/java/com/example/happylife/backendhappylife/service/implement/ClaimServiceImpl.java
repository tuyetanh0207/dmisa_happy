package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.ClaimRepo;
import com.example.happylife.backendhappylife.service.ClaimService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class ClaimServiceImpl implements ClaimService {
    @Autowired
    private ClaimRepo claimRepo;

    @Override
    public Claim addClaim(UserResDTO authUser, Claim claim){
        try {
            if (authUser.getRole() == Role.CUSTOMER) {
                return null;
                /*} else{
                    throw  new UserCreationException("Error updating status of registration: status is invalid.");
                }*/
            } else {
                throw  new UserCreationException("Error to request the new claim, you need an authenticated account to do this action.");
            }
        } catch (Exception e){
            throw  new UserCreationException("Error to request the new claim : "+ e.getMessage());
        }
    }
}

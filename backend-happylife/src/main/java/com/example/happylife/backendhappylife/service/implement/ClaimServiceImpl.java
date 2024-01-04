package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.ClaimRepo;
import com.example.happylife.backendhappylife.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ClaimServiceImpl implements ClaimService {
    @Autowired
    private ClaimRepo claimRepo;

    @Override
    public List<Claim> getAllClaim() {
        List<Claim> claims = claimRepo.findAll();
        return claims;
    }
    @Override
    public List<Claim> getAllClaimUser(UserResDTO user) {
        List<Claim> claims = claimRepo.findByRegisInfo_CustomerInfo(user.getId());
        return claims;
    }
    @Override
    public Claim addClaim(Claim claim){ //UserResDTO authUser,
        try {
            /*if (authUser.getRole() == Role.CUSTOMER) {*/
                Instant instantNow = Instant.now();
                claim.setCreatedAt(instantNow);
                claim.setUpdatedAt(instantNow);
                return claimRepo.save(claim);
               /* } else{
                    throw  new UserCreationException("Error updating status of registration: status is invalid.");
                }*/
          /*  } else {
                throw  new UserCreationException("Error to request the new claim, you need an authenticated account to do this action.");
            }*/
        } catch (Exception e){
            throw  new UserCreationException("Error to request the new claim : "+ e.getMessage());
        }
    }
}

package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateStaffDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import org.bson.types.ObjectId;

import java.util.List;

public interface ClaimService {
    //Claim addClaim(UserResDTO authUser, Claim claim);
    List<ClaimResDTO> getAllClaim();
    
    ClaimResDTO updateClaimStatus(UserResDTO authUser, ObjectId claimId, ClaimResDTO claim, Message msg);

    //Service for Customer
    ClaimResDTO addClaim(ClaimCreateDTO claimCreateDTO);

    List<ClaimResDTO> getAllClaimByRegisId(ObjectId regisId, UserResDTO userVar);

    List<ClaimResDTO> getAllClaimByUserId(UserResDTO user, ObjectId userId);

    ClaimResDTO updateClaimByStaff(UserResDTO authUser, ObjectId claimId, ClaimUpdateStaffDTO claim);

    //Service for image and files
    //ClaimResDTO updateClaimImageDocUrl(ObjectId claimId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts);
    ClaimResDTO updateClaimImageOrFileDocUrl(ObjectId claimId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts);

    ClaimResDTO updateClaimFilesDocUrl(ObjectId claimId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts);
}

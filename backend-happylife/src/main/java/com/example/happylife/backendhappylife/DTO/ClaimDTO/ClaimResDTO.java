package com.example.happylife.backendhappylife.DTO.ClaimDTO;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Object.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClaimResDTO {
    private String claimId;

    private RegisResDTO regisInfo;


    private String status;

    private List<String> claimCategories;

    private Integer claimAmount;

    private String content;

    private List<Claim.documentClaims> documentUrls;


    private List<Claim.ClaimInvoices> claimInvoices;


    private float claimTotalRequest;


    private Instant approvalDate;

    private List<Message> message;
    private String hospitalName;

    private Instant createdAt;

    private Instant updatedAt;
}

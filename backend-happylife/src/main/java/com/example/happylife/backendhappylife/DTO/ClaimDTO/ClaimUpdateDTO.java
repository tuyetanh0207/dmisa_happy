package com.example.happylife.backendhappylife.DTO.ClaimDTO;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClaimUpdateDTO {
    private RegisResDTO regisInfo;
    private String status;
    private List<String> claimCategories;
    private Integer claimAmount;
    private String content;
    private List<Claim.documentClaims> documentUrls;
    private List<Claim.ClaimInvoices> claimInvoices;
    private float claimTotalRequest;
    private Instant approvalDate;
    private String hospitalName;
    private Instant createdAt;
    private Instant updatedAt;


    public void setRegisInfo(RegisResDTO regisInfo) {
        this.regisInfo = regisInfo;
    }

    public void setClaimCategories(List<String> claimCategories) {
        this.claimCategories = claimCategories;
    }

    public void setClaimAmount(Integer claimAmount) {
        this.claimAmount = claimAmount;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDocumentUrls(List<Claim.documentClaims> documentUrls) {
        this.documentUrls = documentUrls;
    }

    public void setClaimInvoices(List<Claim.ClaimInvoices> claimInvoices) {
        this.claimInvoices = claimInvoices;
    }

    public void setClaimTotalRequest(float claimTotalRequest) {
        this.claimTotalRequest = claimTotalRequest;
    }

    public void setApprovalDate(Instant approvalDate) {
        this.approvalDate = approvalDate;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}

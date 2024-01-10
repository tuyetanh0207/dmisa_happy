package com.example.happylife.backendhappylife.DTO.ClaimDTO;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Object.Message;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ClaimCreateDTO {
    private RegisResDTO regisInfo;
    private String status;
    private List<String> claimCategories;
    private Integer claimAmount;
    private String content;
    private List<Claim.ClaimInvoices> claimInvoices;
    private float claimTotalRequest;
    private Instant approvalDate;
    private List<Message> message;
    private String hospitalName;
    private List<Claim.documentClaims> documentUrls;

    public void setRegisInfo(RegisResDTO regisInfo) {
        this.regisInfo = regisInfo;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public void setClaimInvoices(List<Claim.ClaimInvoices> claimInvoices) {
        this.claimInvoices = claimInvoices;
    }

    public void setClaimTotalRequest(float claimTotalRequest) {
        this.claimTotalRequest = claimTotalRequest;
    }

    public void setApprovalDate(Instant approvalDate) {
        this.approvalDate = approvalDate;
    }

    public void setMessage(List<Message> message) {
        this.message = message;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public void setDocumentUrls(List<Claim.documentClaims> documentUrls) {
        this.documentUrls = documentUrls;
    }
}

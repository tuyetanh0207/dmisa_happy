package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Object.Message;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Claim")
public class Claim {
    @Id
    private ObjectId claimId;

    @Column(nullable = false)
    private RegisResDTO regisInfo;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private List<String> claimCategories;
    @Column(nullable = false)
    private Integer claimAmount;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private List<documentClaims> documentUrls;

    @Column(nullable = false)
    private List<ClaimInvoices> claimInvoices;

    @Column(nullable = false)
    private float claimTotalRequest;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant approvalDate;

    private List<Message> message;
    private String hospitalName;
    @Field(targetType = FieldType.DATE_TIME)
    private Instant createdAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant updatedAt;

    @Getter
    public static class documentClaims{
        @Column(nullable = false)
        private String docCategory;
        @Column(nullable = false)
        private List<String> urls;

        public void setDocCategory(String docCategory) {
            this.docCategory = docCategory;
        }
        public void setUrls(List<String> urls) {
            this.urls = urls;
        }
    }
    @Getter
    public static class ClaimInvoices{
        @Column(nullable = false)
        private List<String> urls;
        @Field(targetType = FieldType.DATE_TIME)
        private Instant invoiceDate;
        @Column(nullable = false)
        private float amount;
        @Column(nullable = false)
        private String status;
        @Column(nullable = false)
        private float claimPercentage;
        @Column(nullable = false)
        private float claimAmount;

        public void setUrls(List<String> urls) {
            this.urls = urls;
        }

        public void setInvoiceDate(Instant invoiceDate) {
            this.invoiceDate = invoiceDate;
        }

        public void setAmount(float amount) {
            this.amount = amount;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public void setClaimPercentage(float claimPercentage) {
            this.claimPercentage = claimPercentage;
        }

        public void setClaimAmount(float claimAmount) {
            this.claimAmount = claimAmount;
        }
    }
    // convert funcs
    public ClaimResDTO convertClaimToRes(Claim claim){
        ClaimResDTO claimRes = new ClaimResDTO();
        claimRes.setClaimId(claim.getClaimId().toString());
        claimRes.setRegisInfo(claim.getRegisInfo());
        claimRes.setStatus(claim.getStatus());
        claimRes.setClaimCategories(claim.getClaimCategories());
        claimRes.setClaimAmount(claim.getClaimAmount());
        claimRes.setContent(claim.getContent());
        claimRes.setDocumentUrls(claim.getDocumentUrls());
        claimRes.setClaimInvoices(claim.getClaimInvoices());
        claimRes.setClaimTotalRequest(claim.getClaimTotalRequest());
        claimRes.setApprovalDate(claim.getApprovalDate());
        claimRes.setMessage(claim.getMessage());
        claimRes.setHospitalName(claim.getHospitalName());
        claimRes.setCreatedAt(claim.getCreatedAt());
        claimRes.setUpdatedAt(claim.getUpdatedAt());
        return claimRes;



    }
}

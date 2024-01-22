package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateStaffDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
import java.util.Date;
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
        @Temporal(TemporalType.DATE)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
        private Date invoiceDate;
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

        public void setInvoiceDate(Date invoiceDate) {
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
    public ClaimResDTO convertClaimToRes() {
        ClaimResDTO claimRes = new ClaimResDTO();
        claimRes.setClaimId(this.claimId.toString());
        claimRes.setRegisInfo(this.regisInfo);
        claimRes.setStatus(this.status);
        claimRes.setClaimCategories(this.claimCategories);
        claimRes.setClaimAmount(this.claimAmount);
        claimRes.setContent(this.content);
        claimRes.setDocumentUrls(this.documentUrls);
        claimRes.setClaimInvoices(this.claimInvoices);
        claimRes.setClaimTotalRequest(this.claimTotalRequest);
        claimRes.setApprovalDate(this.approvalDate);
        claimRes.setMessage(this.message);
        claimRes.setHospitalName(this.hospitalName);
        claimRes.setCreatedAt(this.createdAt);
        claimRes.setUpdatedAt(this.updatedAt);
        return claimRes;
    }
    public Claim convertCreToClaim(ClaimCreateDTO dto) {
        Claim claim = new Claim();
        claim.setClaimCategories(dto.getClaimCategories()); // set name
        claim.setClaimAmount(dto.getClaimAmount()); // set about
        claim.setClaimInvoices(dto.getClaimInvoices());
        claim.setClaimTotalRequest(dto.getClaimTotalRequest());
        claim.setContent(dto.getContent());
        claim.setApprovalDate(dto.getApprovalDate()); // set recommended
        claim.setMessage(dto.getMessage()); // set duration
        claim.setDocumentUrls(dto.getDocumentUrls()); //set duration unit
        claim.setHospitalName(dto.getHospitalName());
        claim.setRegisInfo(dto.getRegisInfo());
        claim.setStatus(dto.getStatus()); // set benefits
        return claim;
    }
    public Claim convertUpToClaim(ClaimUpdateDTO dto) {
        Claim claim = new Claim();
        claim.setClaimCategories(dto.getClaimCategories()); // set name
        claim.setClaimAmount(dto.getClaimAmount()); // set about
        claim.setClaimInvoices(dto.getClaimInvoices());
        claim.setClaimTotalRequest(dto.getClaimTotalRequest());
        claim.setContent(dto.getContent());
        claim.setApprovalDate(dto.getApprovalDate()); // set recommended
        claim.setDocumentUrls(dto.getDocumentUrls()); //set duration unit
        claim.setHospitalName(dto.getHospitalName());
        claim.setRegisInfo(dto.getRegisInfo());
        claim.setStatus(dto.getStatus()); // set benefits
        return claim;
    }
    public Claim convertUpStaffToClaim(ClaimUpdateStaffDTO dto) {
        Claim claim = new Claim();
        claim.setClaimCategories(dto.getClaimCategories()); // set name
        claim.setClaimAmount(dto.getClaimAmount()); // set about
        claim.setClaimInvoices(dto.getClaimInvoices());
        claim.setClaimTotalRequest(dto.getClaimTotalRequest());
        claim.setApprovalDate(dto.getApprovalDate()); // set recommended
        claim.setRegisInfo(dto.getRegisInfo());
        claim.setStatus(dto.getStatus()); // set benefits
        return claim;
    }
    public Claim convertResToClaim(ClaimResDTO dto) {
        Claim claim = new Claim();
        if(dto.getClaimId() != null){
            ObjectId dtoId = new ObjectId(dto.getClaimId());
            claim.setClaimId(dtoId);
        }
        claim.setClaimCategories(dto.getClaimCategories()); // set name
        claim.setClaimAmount(dto.getClaimAmount()); // set about
        claim.setClaimInvoices(dto.getClaimInvoices());
        claim.setClaimTotalRequest(dto.getClaimTotalRequest());
        claim.setContent(dto.getContent());
        claim.setApprovalDate(dto.getApprovalDate()); // set recommended
        claim.setMessage(dto.getMessage()); // set duration
        claim.setDocumentUrls(dto.getDocumentUrls()); //set duration unit
        claim.setHospitalName(dto.getHospitalName());
        claim.setRegisInfo(dto.getRegisInfo());
        claim.setStatus(dto.getStatus()); // set benefits
        claim.setUpdatedAt(dto.getUpdatedAt());
        claim.setCreatedAt(dto.getCreatedAt()); // set benefits
        return claim;
    }

    public ClaimResDTO convertToClaimResDTO() {
        ClaimResDTO dto = new ClaimResDTO();
        dto.setApprovalDate(this.approvalDate);
        dto.setClaimCategories(this.claimCategories); // set name
        dto.setClaimAmount(this.claimAmount); // set about
        dto.setClaimInvoices(this.claimInvoices);
        dto.setContent(this.content);
        dto.setClaimTotalRequest(this.claimTotalRequest);
        dto.setClaimId(this.claimId.toString()); // set recommended
        dto.setMessage(this.message); // set duration
        dto.setHospitalName(this.hospitalName); //set duration unit
        dto.setDocumentUrls(this.documentUrls);
        dto.setCreatedAt(this.createdAt);
        dto.setUpdatedAt(this.updatedAt); // set benefits
        dto.setStatus(this.status); // set service coverage
        dto.setRegisInfo(this.regisInfo);
        return dto;
    }
    public ClaimCreateDTO convertToClaimCreateDTO() {
        ClaimCreateDTO dto = new ClaimCreateDTO();
        dto.setApprovalDate(this.approvalDate);
        dto.setClaimCategories(this.claimCategories); // set name
        dto.setClaimAmount(this.claimAmount); // set about
        dto.setClaimInvoices(this.claimInvoices);
        dto.setContent(this.content);
        dto.setClaimTotalRequest(this.claimTotalRequest);
        dto.setMessage(this.message); // set duration
        dto.setHospitalName(this.hospitalName); //set duration unit
        dto.setDocumentUrls(this.documentUrls);
        dto.setStatus(this.status); // set service coverage
        dto.setRegisInfo(this.regisInfo);
        return dto;
    }
}

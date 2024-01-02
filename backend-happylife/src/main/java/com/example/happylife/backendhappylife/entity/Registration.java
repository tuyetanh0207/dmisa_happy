package com.example.happylife.backendhappylife.entity;


import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisUpdateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Object.Message;
import jakarta.persistence.Column;
import lombok.*;
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
@Document(collection="Registrations")
@Builder
public class Registration {

    @Id
    private ObjectId regisId;

    private UserResDTO customerInfo;
    private PlanResDTO productInfo;
    private UserResDTO managerInfo;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String approvalStatus;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant startDate;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant endDate;

    @Column(nullable = false)
    private Integer insuranceAmount;

    @Column(nullable = false)
    private String paymentDetails;

    private Date renewalReminder;
    @Field(targetType = FieldType.DATE_TIME)
    private Instant createdAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant updatedAt;

    private List<Message> message;

    private List<parHistory> participantHistory;

    private ContractResDTO contractIdInfo;
    private List<documentRegiss> documentUrls;
    public static class documentRegiss{
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
    public static class parHistory {
        @Field(targetType = FieldType.DATE_TIME)
        private Instant startDate;
        @Field(targetType = FieldType.DATE_TIME)
        private Instant endDate;
        @Column(nullable = false)
        private String status;
        private ContractResDTO contractInfo;
    }
    public Registration convertToRegis(RegisResDTO dto) {
        Registration regis = new Registration();
        regis.setManagerInfo(dto.getManagerInfo());
        regis.setCustomerInfo(dto.getCustomerInfo());
        regis.setProductInfo(dto.getProductInfo());
        regis.setApprovalStatus(dto.getApprovalStatus());
        regis.setStartDate(dto.getStartDate());
        regis.setEndDate(dto.getEndDate());
        regis.setPrice(dto.getPrice());
        regis.setPaymentDetails(dto.getPaymentDetails());
        regis.setRenewalReminder(dto.getRenewalReminder());
        regis.setMessage(dto.getMessage());
        //Còn thiếu tương đối nhiều
        return regis;
    }

    public RegisResDTO convertToRegisResDTO() {
        RegisResDTO dto = new RegisResDTO();
        dto.setRegisId(this.regisId.toString());
        dto.setManagerInfo(this.managerInfo);
        dto.setCustomerInfo(this.customerInfo);
        dto.setProductInfo(this.productInfo);

        dto.setApprovalStatus(this.approvalStatus);
        dto.setStartDate(this.startDate);
        dto.setEndDate(this.endDate);
        dto.setDocumentUrls(this.getDocumentUrls());
        dto.setPrice(this.price);
        dto.setPaymentDetails(this.paymentDetails);
        dto.setRenewalReminder(this.renewalReminder);
        dto.setMessage(this.message);
        return dto;
    }

    public RegisCreateDTO convertToRegisCreateDTO() {
        RegisCreateDTO dto = new RegisCreateDTO();
        dto.setRegisId(this.regisId.toString());
        dto.setManagerInfo(this.managerInfo);
        dto.setCustomerInfo(this.customerInfo);
        dto.setProductInfo(this.productInfo);

        dto.setApprovalStatus(this.approvalStatus);
        dto.setStartDate(this.startDate);
        dto.setEndDate(this.endDate);
        return dto;
    }

    public Registration convertCreToRegistrations(RegisCreateDTO dto) {
        Registration regis = new Registration();
        if(dto.getRegisId() != null){
            ObjectId dtoId = new ObjectId(dto.getRegisId());
            regis.setRegisId(dtoId);
        }

        regis.setManagerInfo(dto.getManagerInfo());
        regis.setCustomerInfo(dto.getCustomerInfo());
        regis.setProductInfo(dto.getProductInfo());

        regis.setApprovalStatus(dto.getApprovalStatus());
        regis.setStartDate(dto.getStartDate());
        regis.setEndDate(dto.getEndDate());
        return regis;
    }
    public Registration convertUpdToRegistrations(RegisUpdateDTO dto) {
        Registration regis = new Registration();
        if(dto.getRegisId() != null){
            ObjectId dtoId = new ObjectId(dto.getRegisId());
            regis.setRegisId(dtoId);
        }

        regis.setApprovalStatus(dto.getApprovalStatus());
        regis.setMessage(dto.getMessage());
        return regis;
    }
    public RegisUpdateDTO convertToRegisUpdateDTO() {
        RegisUpdateDTO dto = new RegisUpdateDTO();
        dto.setRegisId(this.regisId.toString());
        dto.setApprovalStatus(this.approvalStatus);
        dto.setMessage(this.message);
        return dto;
    }
}


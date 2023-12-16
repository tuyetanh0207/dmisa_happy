package com.example.happylife.backendhappylife.entity;


import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanBasicDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanInvoiceDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection="Registrations")
@Builder
public class Registration {

    @Id
    private ObjectId regisId;

    private UserResDTO customerInfo;
    private PlanInvoiceDTO productInfo;
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
    private String paymentDetails;

    private Date renewalReminder;
    @Field(targetType = FieldType.DATE_TIME)
    private Instant createdAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant updatedAt;

    private String message;

    public RegisResDTO convertToRegisResDTO() {
        RegisResDTO dto = new RegisResDTO();
        dto.setRegisId(this.regisId);
        dto.setManagerInfo(this.managerInfo);
        dto.setCustomerInfo(this.customerInfo);
        dto.setProductInfo(this.productInfo);
        dto.setApprovalStatus(this.approvalStatus);
        dto.setStartDate(this.startDate);
        dto.setEndDate(this.endDate);
        return dto;
    }
}


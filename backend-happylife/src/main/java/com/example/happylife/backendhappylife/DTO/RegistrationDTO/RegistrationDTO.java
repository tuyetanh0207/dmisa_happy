package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanBasicDTO;
import com.example.happylife.backendhappylife.DTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDTO {
    private ObjectId regisID;

    private UserResDTO customerInfo;
    private PlanBasicDTO productInfo;
    private UserResDTO managerInfo;


    private Integer price;


    private String approvalStatus;


    private Instant startDate;


    private Instant endDate;


    private String paymentDetails;

    private Date renewalReminder;

    private Instant createdAt;

    private Instant updatedAt;
    private String message;


}

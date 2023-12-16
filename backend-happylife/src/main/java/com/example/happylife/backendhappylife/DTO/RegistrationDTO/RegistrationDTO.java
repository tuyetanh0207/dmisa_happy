package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanBasicDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

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

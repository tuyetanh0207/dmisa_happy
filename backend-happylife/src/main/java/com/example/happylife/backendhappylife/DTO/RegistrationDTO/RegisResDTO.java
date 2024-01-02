package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.entity.Registration;
import lombok.*;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@Getter
public class RegisResDTO {
    private String regisId;
//    @Getter
    private UserResDTO customerInfo;
//    @Getter
    private PlanResDTO productInfo;
//    @Getter
    private UserResDTO managerInfo;
//    @Getter
    private Integer price;
//    @Getter
    private String approvalStatus;
//    @Getter
    private Instant startDate;
//    @Getter
    private Instant endDate;
//    @Getter
    private String paymentDetails;
//    @Getter
    private Date renewalReminder;
//    @Getter
    private Instant createdAt;
//    @Getter
    private Instant updatedAt;
    private List<Message> message;

}

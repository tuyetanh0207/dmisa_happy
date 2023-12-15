package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanBasicDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisCreateDTO {
    private String regisId;
    private UserResDTO customerInfo;
    private PlanBasicDTO productInfo;
    private UserResDTO managerInfo;

    private String approvalStatus;
    private Instant startDate;
    private Instant endDate;
}

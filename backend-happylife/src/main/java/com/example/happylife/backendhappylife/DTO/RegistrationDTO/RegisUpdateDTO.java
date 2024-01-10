package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.entity.Registration;
import lombok.Getter;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Getter
public class RegisUpdateDTO {
    private String regisId;
    private String approvalStatus;
    private List<Message> message;

    public void setRegisId(String regisId) {
        this.regisId = regisId;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public void setMessage(List<Message> message) {
        this.message = message;
    }
}

package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;

import java.time.Instant;
import java.util.Date;

public class RegisUpdateDTO {
    private String regisID;
    private String approvalStatus;
    private String message;

    public String getRegisID() {
        return regisID;
    }

    public void setRegisID(String regisID) {
        this.regisID = regisID;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

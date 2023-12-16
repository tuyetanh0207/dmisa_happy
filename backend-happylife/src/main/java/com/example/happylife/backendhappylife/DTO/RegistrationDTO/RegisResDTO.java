package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanBasicDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanInvoiceDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import org.bson.types.ObjectId;

import java.time.Instant;

public class RegisResDTO {
    private ObjectId regisId;
    private UserResDTO customerInfo;
    private PlanBasicDTO productInfo;
    private UserResDTO managerInfo;

    private String approvalStatus;
    private Instant startDate;
    private Instant endDate;

    public ObjectId getRegisId() {
        return regisId;
    }

    public void setRegisId(ObjectId regisId) {
        this.regisId = regisId;
    }

    public UserResDTO getCustomerInfo() {
        return customerInfo;
    }

    public void setCustomerInfo(UserResDTO customerInfo) {
        this.customerInfo = customerInfo;
    }

    public PlanBasicDTO getProductInfo() {
        return productInfo;
    }

    public void setProductInfo(PlanBasicDTO productInfo) {
        this.productInfo = productInfo;
    }

    public UserResDTO getManagerInfo() {
        return managerInfo;
    }

    public void setManagerInfo(UserResDTO managerInfo) {
        this.managerInfo = managerInfo;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }
}

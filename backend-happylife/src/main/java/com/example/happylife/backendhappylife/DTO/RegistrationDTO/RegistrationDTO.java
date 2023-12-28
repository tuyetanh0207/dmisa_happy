package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanBasicDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
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
    private String regisID;

    private UserResDTO customerInfo;
    private PlanResDTO productInfo;
    private UserResDTO managerInfo;

    private String approvalStatus;


    private Instant startDate;


    private Instant endDate;


    private String paymentDetails;

    private Date renewalReminder;

    private Instant createdAt;

    private Instant updatedAt;
    private String message;

    public String getRegisID() {
        return regisID;
    }

    public void setRegisID(String regisID) {
        this.regisID = regisID;
    }

    public UserResDTO getCustomerInfo() {
        return customerInfo;
    }

    public void setCustomerInfo(UserResDTO customerInfo) {
        this.customerInfo = customerInfo;
    }

    public PlanResDTO getProductInfo() {
        return productInfo;
    }

    public void setProductInfo(PlanResDTO productInfo) {
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

    public String getPaymentDetails() {
        return paymentDetails;
    }

    public void setPaymentDetails(String paymentDetails) {
        this.paymentDetails = paymentDetails;
    }

    public Date getRenewalReminder() {
        return renewalReminder;
    }

    public void setRenewalReminder(Date renewalReminder) {
        this.renewalReminder = renewalReminder;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

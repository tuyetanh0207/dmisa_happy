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
public class RegisResDTO {
    private String regisId;
    @Getter
    private UserResDTO customerInfo;
    @Getter
    private PlanResDTO productInfo;
    @Getter
    private UserResDTO managerInfo;
    @Getter
    private Integer price;
    @Getter
    private String approvalStatus;
    @Getter
    private Instant startDate;
    @Getter
    private Instant endDate;
    @Getter
    private String paymentDetails;
    @Getter
    private Date renewalReminder;
    @Getter
    private Instant createdAt;
    @Getter
    private Instant updatedAt;
    private List<Message> message;

    public void setMessage(List<Message> message) {
        this.message = message;
    }

    public void setRegisId(String regisId) {
        this.regisId = regisId;
    }

    public void setCustomerInfo(UserResDTO customerInfo) {
        this.customerInfo = customerInfo;
    }

    public void setProductInfo(PlanResDTO productInfo) {
        this.productInfo = productInfo;
    }

    public void setManagerInfo(UserResDTO managerInfo) {
        this.managerInfo = managerInfo;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public void setPaymentDetails(String paymentDetails) {
        this.paymentDetails = paymentDetails;
    }

    public void setRenewalReminder(Date renewalReminder) {
        this.renewalReminder = renewalReminder;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}

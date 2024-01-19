package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.entity.Registration;
import lombok.*;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDTO {
    private String regisId;

    private UserResDTO customerInfo;
    private PlanResDTO productInfo;
    private UserResDTO managerInfo;

    private String approvalStatus;


    private Instant startDate;


    private Instant endDate;

    private Integer totalFee;

    private String paymentDetails;

    private Date renewalReminder;

    private Instant createdAt;

    private Instant updatedAt;

    private List<Message> message;

    public void setTotalFee(Integer totalFee) {
        this.totalFee = totalFee;
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

    public void setMessage(List<Message> message) {
        this.message = message;
    }
}

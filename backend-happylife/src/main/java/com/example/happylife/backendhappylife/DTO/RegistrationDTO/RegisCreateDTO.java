package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Registration;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisCreateDTO {
    private String regisId;
    private UserResDTO customerInfo;
    private PlanResDTO productInfo;
    private UserResDTO managerInfo;

    private String approvalStatus;
    private Instant startDate;
    private Instant endDate;
    private List<Registration.documentRegiss> documentUrls;

    public String getRegisId() {
        return regisId;
    }

    public void setRegisId(String regisId) {
        this.regisId = regisId;
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

    public List<Registration.documentRegiss>  getDocumentUrls() {
        return documentUrls;
    }
    public void setDocumentUrls(List<Registration.documentRegiss> documentUrls) {
        this.documentUrls = documentUrls;
    }
}

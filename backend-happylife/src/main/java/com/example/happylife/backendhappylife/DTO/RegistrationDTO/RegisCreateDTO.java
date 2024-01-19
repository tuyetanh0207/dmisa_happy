package com.example.happylife.backendhappylife.DTO.RegistrationDTO;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Registration;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisCreateDTO {
    @Getter
    private String regisId;
    @Getter
    private UserResDTO customerInfo;
    @Getter
    private PlanResDTO productInfo;
    @Getter
    private UserResDTO managerInfo;

    private Integer totalFee;
    @Getter
    private String approvalStatus;
    @Getter
    private Instant startDate;
    @Getter
    private Instant endDate;
    @Getter
    private List<Registration.documentRegiss> documentUrls;

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

    public void setDocumentUrls(List<Registration.documentRegiss> documentUrls) {
        this.documentUrls = documentUrls;
    }
}

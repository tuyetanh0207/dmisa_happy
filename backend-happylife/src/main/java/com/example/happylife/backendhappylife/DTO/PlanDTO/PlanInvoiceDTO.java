package com.example.happylife.backendhappylife.DTO.PlanDTO;

import lombok.*;
import org.bson.types.ObjectId;

@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlanInvoiceDTO {
    private String planId;
    private String planName;
    private String planAbout;
    private Integer planPrice;
    private String planType;
    private String planBenefits;

    public void setPlanId(String planId) {
        this.planId = planId;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public void setPlanAbout(String planAbout) {
        this.planAbout = planAbout;
    }

    public void setPlanPrice(Integer planPrice) {
        this.planPrice = planPrice;
    }

    public void setPlanType(String planType) {
        this.planType = planType;
    }

    public void setPlanBenefits(String planBenefits) {
        this.planBenefits = planBenefits;
    }
}

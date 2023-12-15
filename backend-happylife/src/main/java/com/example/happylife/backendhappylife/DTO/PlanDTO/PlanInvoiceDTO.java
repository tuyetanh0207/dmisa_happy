package com.example.happylife.backendhappylife.DTO.PlanDTO;

import org.bson.types.ObjectId;

public class PlanInvoiceDTO {
    private ObjectId planId;
    private String planName;
    private String planAbout;
    private Integer planPrice;
    private String planType;
    private String planBenefits;

    public ObjectId getPlanId() {
        return planId;
    }

    public void setPlanId(ObjectId planId) {
        this.planId = planId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getPlanAbout() {
        return planAbout;
    }

    public void setPlanAbout(String planAbout) {
        this.planAbout = planAbout;
    }

    public Integer getPlanPrice() {
        return planPrice;
    }

    public void setPlanPrice(Integer planPrice) {
        this.planPrice = planPrice;
    }

    public String getPlanType() {
        return planType;
    }

    public void setPlanType(String planType) {
        this.planType = planType;
    }

    public String getPlanBenefits() {
        return planBenefits;
    }

    public void setPlanBenefits(String planBenefits) {
        this.planBenefits = planBenefits;
    }
}

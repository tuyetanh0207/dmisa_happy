package com.example.happylife.backendhappylife.DTO.PlanDTO;

import com.example.happylife.backendhappylife.entity.Enum.DateUnit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlanResDTO {
    private ObjectId planId;
    private String planName;
    private String planAbout;
    private Integer planPrice;
    private String planType;
    private String planRecommended;
    private Integer planDuration;
    private DateUnit planDurationUnit;
    private List<String> planBenefits;
    private String planServiceCoverage;
    private String planURL;

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

    public String getPlanRecommended() {
        return planRecommended;
    }

    public void setPlanRecommended(String planRecommended) {
        this.planRecommended = planRecommended;
    }

    public Integer getPlanDuration() {
        return planDuration;
    }

    public void setPlanDuration(Integer planDuration) {
        this.planDuration = planDuration;
    }

    public DateUnit getPlanDurationUnit() {
        return planDurationUnit;
    }

    public void setPlanDurationUnit(DateUnit planDurationUnit) {
        this.planDurationUnit = planDurationUnit;
    }

    public List<String> getPlanBenefits() {
        return planBenefits;
    }

    public void setPlanBenefits(List<String> planBenefits) {
        this.planBenefits = planBenefits;
    }

    public String getPlanServiceCoverage() {
        return planServiceCoverage;
    }

    public void setPlanServiceCoverage(String planServiceCoverage) {
        this.planServiceCoverage = planServiceCoverage;
    }

    public String getPlanURL() {
        return planURL;
    }

    public void setPlanURL(String planURL) {
        this.planURL = planURL;
    }
}

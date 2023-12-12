package com.example.happylife.backendhappylife.DTO.PlanDTO;

import jakarta.persistence.Column;
import lombok.*;
import org.bson.types.ObjectId;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.time.Instant;
import java.util.Date;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class PlanCreateDTO {
    private String planName;
    private String planAbout;
    private Integer planPrice;
    private String planType;
    private String planRecommended;
    private String planDuration;
    private String planBenefits;
    private String planServiceCoverage;
    private String planURL;

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

    public String getPlanDuration() {
        return planDuration;
    }

    public void setPlanDuration(String planDuration) {
        this.planDuration = planDuration;
    }

    public String getPlanBenefits() {
        return planBenefits;
    }

    public void setPlanBenefits(String planBenefits) {
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

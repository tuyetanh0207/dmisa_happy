package com.example.happylife.backendhappylife.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.time.ZonedDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "InsurancePlans")
public class InsurancePlan {
    @Id
    private int insurancePlanID;
    private String insurancePlanName;
    private String insurancePlanAbout;
    private ZonedDateTime insurancePlanAboutcreatedAt;
    private ZonedDateTime insurancePlanAboutupdatedAt;
    private Integer insurancePlanPrice;
    private String insurancePlanType;
    private String insurancePlanRecommended;
    private String insurancePlanDuration;
    private String insurancePlanBenefits;
    private String insurancePlanServiceCoverage;
    private String insurancePlanURL;
}


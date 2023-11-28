package com.example.happylife.backendhappylife.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.ZonedDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Plans")
public class Plan {
    @Id
    private ObjectId PlanId;
    private String PlanName;
    private String PlanAbout;
    private ZonedDateTime PlanAboutcreatedAt;
    private ZonedDateTime PlanAboutupdatedAt;
    private Integer PlanPrice;
    private String PlanType;
    private String PlanRecommended;
    private String PlanDuration;
    private String PlanBenefits;
    private String PlanServiceCoverage;
    private String PlanURL;
}


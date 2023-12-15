package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.entity.Enum.DateUnit;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Plans")
public class Plan {
    @Id
    private ObjectId planId;

    @Column(nullable = false)
    private String planName;

    @Column(nullable = false)
    private String planAbout;

    @Column(nullable = false)
    private Integer planPrice;

    @Column(nullable = false)
    private String planType;

    private String planRecommended;

    @Column(nullable = false)
    private Integer planDuration;

    @Column(nullable = false)
    private DateUnit planDurationUnit;

    private List<String> planBenefits;

    private String planServiceCoverage;

    private String planURL;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant planCreatedAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant planUpdatedAt;

    // Convert PlanCreateDTO sang Plan
    public Plan convertCreToPlan(PlanCreateDTO planCreateDTO) {
        Plan plan = new Plan();
        plan.setPlanName(planCreateDTO.getPlanName()); // set name
        plan.setPlanAbout(planCreateDTO.getPlanAbout()); // set about
        plan.setPlanPrice(planCreateDTO.getPlanPrice()); // set price
        plan.setPlanType(planCreateDTO.getPlanType()); // set type
        plan.setPlanRecommended(planCreateDTO.getPlanRecommended()); // set recommended
        plan.setPlanDuration(planCreateDTO.getPlanDuration()); // set duration
        plan.setPlanDurationUnit(planCreateDTO.getPlanDurationUnit()); //set duration unit
        plan.setPlanBenefits(planCreateDTO.getPlanBenefits()); // set benefits
        plan.setPlanServiceCoverage(planCreateDTO.getPlanServiceCoverage()); // set service coverage
        plan.setPlanURL(planCreateDTO.getPlanURL()); // set URL
        return plan;
    }
    // Convert PlanUpdateDTO sang Plan
    public Plan convertUpdToPlan(PlanUpdateDTO planUpdateDTO) {
        Plan plan = new Plan();
        plan.setPlanName(planUpdateDTO.getPlanName()); // set name
        plan.setPlanAbout(planUpdateDTO.getPlanAbout()); // set about
        plan.setPlanPrice(planUpdateDTO.getPlanPrice()); // set price
        plan.setPlanType(planUpdateDTO.getPlanType()); // set type
        plan.setPlanRecommended(planUpdateDTO.getPlanRecommended()); // set recommended
        plan.setPlanDuration(planUpdateDTO.getPlanDuration()); // set duration
        plan.setPlanDurationUnit(planUpdateDTO.getPlanDurationUnit()); //set duration unit
        plan.setPlanBenefits(planUpdateDTO.getPlanBenefits()); // set benefits
        plan.setPlanServiceCoverage(planUpdateDTO.getPlanServiceCoverage()); // set service coverage
        plan.setPlanURL(planUpdateDTO.getPlanURL()); // set URL
        return plan;
    }
    // Convert Plan sang PlanResDTO
    public PlanResDTO convertToPlanResDTO() {
        PlanResDTO dto = new PlanResDTO();
        dto.setPlanId(this.planId); // set id
        dto.setPlanName(this.planName); // set name
        dto.setPlanAbout(this.planAbout); // set about
        dto.setPlanPrice(this.planPrice); // set price
        dto.setPlanType(this.planType); // set type
        dto.setPlanRecommended(this.planRecommended); // set recommended
        dto.setPlanDuration(this.getPlanDuration()); // set duration
        dto.setPlanDurationUnit(this.getPlanDurationUnit());
        dto.setPlanBenefits(this.planBenefits); // set benefits
        dto.setPlanServiceCoverage(this.planServiceCoverage); // set service coverage
        dto.setPlanURL(this.planURL); // set URL
        return dto;
    }
    public PlanCreateDTO convertToPlanCreateDTO() {
        PlanCreateDTO dto = new PlanCreateDTO();
        dto.setPlanName(this.planName); // set name
        dto.setPlanAbout(this.planAbout); // set about
        dto.setPlanPrice(this.planPrice); // set price
        dto.setPlanType(this.planType); // set type
        dto.setPlanRecommended(this.planRecommended); // set recommended
        dto.setPlanDuration(this.planDuration); // set duration
        dto.setPlanDurationUnit(this.planDurationUnit);// set duration unit
        dto.setPlanBenefits(this.planBenefits); // set benefits
        dto.setPlanServiceCoverage(this.planServiceCoverage); // set service coverage
        dto.setPlanURL(this.planURL); // set URL
        return dto;
    }

    public PlanUpdateDTO convertToPlanUpdateDTO() {
        PlanUpdateDTO dto = new PlanUpdateDTO();
        dto.setPlanId(this.planId);
        dto.setPlanName(this.planName); // set name
        dto.setPlanAbout(this.planAbout); // set about
        dto.setPlanPrice(this.planPrice); // set price
        dto.setPlanType(this.planType); // set type
        dto.setPlanRecommended(this.planRecommended); // set recommended
        dto.setPlanDuration(this.planDuration); // set duration
        dto.setPlanDurationUnit(this.planDurationUnit);// set duration unit
        dto.setPlanBenefits(this.planBenefits); // set benefits
        dto.setPlanServiceCoverage(this.planServiceCoverage); // set service coverage
        dto.setPlanURL(this.planURL); // set URL
        return dto;
    }


}

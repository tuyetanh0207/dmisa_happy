package com.example.happylife.backendhappylife.DTO.PlanDTO;

import com.example.happylife.backendhappylife.entity.Enum.DateUnit;
import com.example.happylife.backendhappylife.entity.Plan;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document
public class PlanResDTO {
    private String planId;
    private String planName;
    private String planAbout;
    private String planSlogan;
    private List<Plan.planRank> planType;
    private List<Plan.benefitsType> optionalBenefits;
    private String planRecommended;
    private Integer planDuration;
    private DateUnit planDurationUnit;
    private List<String> claimScenarios;
    private List<String> documentName;
    private List<String> planBenefits;
    private String planServiceCoverage;
    private List<String> planURL;
    private List<Plan.advertisement> planAdvertisement;
    private List<Plan.documents> planDocuments;
    private Instant planCreatedAt;
    private Instant planUpdatedAt;

    public void setPlanId(String planId) {
        this.planId = planId;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public void setPlanAbout(String planAbout) {
        this.planAbout = planAbout;
    }

    public void setPlanSlogan(String planSlogan) {
        this.planSlogan = planSlogan;
    }

    public void setPlanType(List<Plan.planRank> planType) {
        this.planType = planType;
    }

    public void setOptionalBenefits(List<Plan.benefitsType> optionalBenefits) {
        this.optionalBenefits = optionalBenefits;
    }

    public void setPlanRecommended(String planRecommended) {
        this.planRecommended = planRecommended;
    }

    public void setPlanDuration(Integer planDuration) {
        this.planDuration = planDuration;
    }

    public void setPlanDurationUnit(DateUnit planDurationUnit) {
        this.planDurationUnit = planDurationUnit;
    }

    public void setClaimScenarios(List<String> claimScenarios) {
        this.claimScenarios = claimScenarios;
    }

    public void setDocumentName(List<String> documentName) {
        this.documentName = documentName;
    }

    public void setPlanBenefits(List<String> planBenefits) {
        this.planBenefits = planBenefits;
    }

    public void setPlanServiceCoverage(String planServiceCoverage) {
        this.planServiceCoverage = planServiceCoverage;
    }

    public void setPlanURL(List<String> planURL) {
        this.planURL = planURL;
    }

    public void setPlanAdvertisement(List<Plan.advertisement> planAdvertisement) {
        this.planAdvertisement = planAdvertisement;
    }

    public void setPlanDocuments(List<Plan.documents> planDocuments) {
        this.planDocuments = planDocuments;
    }

    public void setPlanCreatedAt(Instant planCreatedAt) {
        this.planCreatedAt = planCreatedAt;
    }

    public void setPlanUpdatedAt(Instant planUpdatedAt) {
        this.planUpdatedAt = planUpdatedAt;
    }
}

package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.entity.Enum.DateUnit;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
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

    private String planSlogan;

    @Column(nullable = false)
    private List<planRank> planType;

    private List<benefitsType> optionalBenefits;

    private String planRecommended;

    @Column(nullable = false)
    private Integer planDuration;

    @Column(nullable = false)
    private DateUnit planDurationUnit;

    private List<String> claimScenarios;

    private List<String> documentName;

    private List<String> planBenefits;

    private String planServiceCoverage;

    private List<String> planURL;

    private List<advertisement> planAdvertisement;

    private List<documents> planDocuments;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant planCreatedAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant planUpdatedAt;

    @Getter
    public static class planRank{
        private String typeName;
        private Integer totalBenefits;
        private List<benefitsType> benefits;

        public void setTypeName(String typeName) {
            this.typeName = typeName;
        }

        public void setTotalBenefits(Integer totalBenefits) {
            this.totalBenefits = totalBenefits;
        }

        public void setBenefits(List<benefitsType> benefits) {
            this.benefits = benefits;
        }
    }

    @Getter
    public static class benefitsType{
        private String benefitName;
        private String dependencies;
        private List<fees> feeType;
        private String unit;
        private Integer insuranceAmount;

        public void setBenefitName(String benefitName) {
            this.benefitName = benefitName;
        }

        public void setDependencies(String dependencies) {
            this.dependencies = dependencies;
        }

        public void setFeeType(List<fees> feeType) {
            this.feeType = feeType;
        }

        public void setUnit(String unit) {
            this.unit = unit;
        }

        public void setInsuranceAmount(Integer insuranceAmount) {
            this.insuranceAmount = insuranceAmount;
        }
    }

    @JsonTypeInfo(
            use = JsonTypeInfo.Id.NAME,
            include = JsonTypeInfo.As.PROPERTY,
            property = "type"
    )
    @JsonSubTypes({
            @JsonSubTypes.Type(value = AgeBasedFee.class, name = "ageBased"),
            @JsonSubTypes.Type(value = InsuranceBasedFee.class, name = "insuranceBased")
    })
    public static class fees {
    }
    @Getter
    public static class AgeBasedFee extends fees {
        private Integer startAge;
        private Integer endAge;
        private Integer fee;

        public void setStartAge(Integer startAge) {
            this.startAge = startAge;
        }

        public void setEndAge(Integer endAge) {
            this.endAge = endAge;
        }

        public void setFee(Integer fee) {
            this.fee = fee;
        }
    }

    @Getter
    public static class InsuranceBasedFee extends fees {
        private Integer fee;
        private Integer insuranceAmount;

        public void setFee(Integer fee) {
            this.fee = fee;
        }

        public void setInsuranceAmount(Integer insuranceAmount) {
            this.insuranceAmount = insuranceAmount;
        }
    }


    @Getter
    public static class advertisement{
        private String title;
        private List<features> featuresList;

        public void setTitle(String title) {
            this.title = title;
        }

        public void setFeaturesList(List<features> featuresList) {
            this.featuresList = featuresList;
        }
    }
    @Getter
    public static class features{
        private String featureName;
        private List<String> featureDetails;

        public void setFeatureName(String featureName) {
            this.featureName = featureName;
        }

        public void setFeatureDetails(List<String> featureDetails) {
            this.featureDetails = featureDetails;
        }
    }

    @Getter
    public static class documents{
        private String docTitle;
        private String docUrl;

        public void setDocTitle(String docTitle) {
            this.docTitle = docTitle;
        }

        public void setDocUrl(String docUrl) {
            this.docUrl = docUrl;
        }
    }

    // Convert PlanCreateDTO sang Plan
    public Plan convertCreToPlan(PlanCreateDTO dto) {
        Plan plan = new Plan();
        plan.setPlanName(dto.getPlanName()); // set name
        plan.setPlanAbout(dto.getPlanAbout()); // set about
        plan.setPlanSlogan(dto.getPlanSlogan());
        plan.setPlanType(dto.getPlanType());
        plan.setOptionalBenefits(dto.getOptionalBenefits());
        plan.setPlanRecommended(dto.getPlanRecommended()); // set recommended
        plan.setPlanDuration(dto.getPlanDuration()); // set duration
        plan.setPlanDurationUnit(dto.getPlanDurationUnit()); //set duration unit
        plan.setClaimScenarios(dto.getClaimScenarios());
        plan.setDocumentName(dto.getDocumentName());
        plan.setPlanBenefits(dto.getPlanBenefits()); // set benefits
        plan.setPlanServiceCoverage(dto.getPlanServiceCoverage()); // set service coverage
        plan.setPlanURL(dto.getPlanURL());
        plan.setPlanAdvertisement(dto.getPlanAdvertisement());
        plan.setPlanDocuments(dto.getPlanDocuments());
        return plan;
    }

    // Convert PlanUpdateDTO sang Plan
    public Plan convertUpdToPlan(PlanUpdateDTO dto) {
        Plan plan = new Plan();
        if(dto.getPlanId() != null){
            ObjectId dtoId = new ObjectId(dto.getPlanId());
            plan.setPlanId(dtoId);
        }
        plan.setPlanName(dto.getPlanName()); // set name
        plan.setPlanAbout(dto.getPlanAbout()); // set about
        plan.setPlanSlogan(dto.getPlanSlogan());
        plan.setPlanType(dto.getPlanType());
        plan.setOptionalBenefits(dto.getOptionalBenefits());
        plan.setPlanRecommended(dto.getPlanRecommended()); // set recommended
        plan.setPlanDuration(dto.getPlanDuration()); // set duration
        plan.setPlanDurationUnit(dto.getPlanDurationUnit()); //set duration unit
        plan.setClaimScenarios(dto.getClaimScenarios());
        plan.setDocumentName(dto.getDocumentName());
        plan.setPlanBenefits(dto.getPlanBenefits()); // set benefits
        plan.setPlanServiceCoverage(dto.getPlanServiceCoverage()); // set service coverage
        plan.setPlanURL(dto.getPlanURL());
        plan.setPlanAdvertisement(dto.getPlanAdvertisement());
        plan.setPlanDocuments(dto.getPlanDocuments());
        return plan;
    }
    // Convert Plan sang PlanResDTO
    public PlanResDTO convertToPlanResDTO() {
        PlanResDTO dto = new PlanResDTO();
        dto.setPlanId(this.planId.toString());
        dto.setPlanName(this.getPlanName()); // set name
        dto.setPlanAbout(this.getPlanAbout()); // set about
        dto.setPlanSlogan(this.getPlanSlogan());
        dto.setPlanType(this.getPlanType());
        dto.setOptionalBenefits(this.getOptionalBenefits());
        dto.setPlanRecommended(this.getPlanRecommended()); // set recommended
        dto.setPlanDuration(this.getPlanDuration()); // set duration
        dto.setPlanDurationUnit(this.getPlanDurationUnit()); //set duration unit
        dto.setClaimScenarios(this.getClaimScenarios());
        dto.setDocumentName(this.getDocumentName());
        dto.setPlanBenefits(this.getPlanBenefits()); // set benefits
        dto.setPlanServiceCoverage(this.getPlanServiceCoverage()); // set service coverage
        dto.setPlanURL(this.getPlanURL());
        dto.setPlanAdvertisement(this.getPlanAdvertisement());
        dto.setPlanDocuments(this.getPlanDocuments());
        dto.setPlanCreatedAt(this.getPlanCreatedAt());
        dto.setPlanUpdatedAt(this.getPlanUpdatedAt());
        return dto;
    }
    public PlanCreateDTO convertToPlanCreateDTO() {
        PlanCreateDTO dto = new PlanCreateDTO();
        dto.setPlanName(this.getPlanName()); // set name
        dto.setPlanAbout(this.getPlanAbout()); // set about
        dto.setPlanSlogan(this.getPlanSlogan());
        dto.setPlanType(this.getPlanType());
        dto.setOptionalBenefits(this.getOptionalBenefits());
        dto.setPlanRecommended(this.getPlanRecommended()); // set recommended
        dto.setPlanDuration(this.getPlanDuration()); // set duration
        dto.setPlanDurationUnit(this.getPlanDurationUnit()); //set duration unit
        dto.setClaimScenarios(this.getClaimScenarios());
        dto.setDocumentName(this.getDocumentName());
        dto.setPlanBenefits(this.getPlanBenefits()); // set benefits
        dto.setPlanServiceCoverage(this.getPlanServiceCoverage()); // set service coverage
        dto.setPlanURL(this.getPlanURL());
        dto.setPlanAdvertisement(this.getPlanAdvertisement());
        dto.setPlanDocuments(this.getPlanDocuments());
        return dto;
    }

    public PlanUpdateDTO convertToPlanUpdateDTO() {
        PlanUpdateDTO dto = new PlanUpdateDTO();
        dto.setPlanId(this.planId.toString());
        dto.setPlanName(this.getPlanName()); // set name
        dto.setPlanAbout(this.getPlanAbout()); // set about
        dto.setPlanSlogan(this.getPlanSlogan());
        dto.setPlanType(this.getPlanType());
        dto.setOptionalBenefits(this.getOptionalBenefits());
        dto.setPlanRecommended(this.getPlanRecommended()); // set recommended
        dto.setPlanDuration(this.getPlanDuration()); // set duration
        dto.setPlanDurationUnit(this.getPlanDurationUnit()); //set duration unit
        dto.setClaimScenarios(this.getClaimScenarios());
        dto.setDocumentName(this.getDocumentName());
        dto.setPlanBenefits(this.getPlanBenefits()); // set benefits
        dto.setPlanServiceCoverage(this.getPlanServiceCoverage()); // set service coverage
        dto.setPlanURL(this.getPlanURL());
        dto.setPlanAdvertisement(this.getPlanAdvertisement());
        dto.setPlanDocuments(this.getPlanDocuments());
        return dto;
    }
}

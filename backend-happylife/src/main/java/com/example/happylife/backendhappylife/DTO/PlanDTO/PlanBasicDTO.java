package com.example.happylife.backendhappylife.DTO.PlanDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlanBasicDTO {
    private String planId;
    private String planName;
    private String planAbout;
    private Integer planPrice;
    private String planType;
    private String planRecommended;
    private String planDuration;
    private String planBenefits;
    private String planServiceCoverage;
    private String planURL;

}

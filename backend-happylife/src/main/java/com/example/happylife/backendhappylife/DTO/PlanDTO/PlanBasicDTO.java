package com.example.happylife.backendhappylife.DTO.PlanDTO;

import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.Role;
import com.example.happylife.backendhappylife.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.net.URL;
import java.util.Date;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlanBasicDTO {
    private Object planId;
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

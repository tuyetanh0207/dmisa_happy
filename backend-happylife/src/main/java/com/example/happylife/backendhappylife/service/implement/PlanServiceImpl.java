package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.PlanRepo;
import com.example.happylife.backendhappylife.service.PlanService;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanServiceImpl implements PlanService {
    @Autowired
    private PlanRepo planRepo;

    @Override
    public Plan deletePlan(ObjectId PlanId) {
        Plan Plan = planRepo.findById(PlanId).get();
        planRepo.delete(Plan);
        return Plan;
    }

    @Override
    public Plan addPlan(UserResDTO user, Plan plan) {
        try {
            if (plan.getPlanName() == null || plan.getPlanName().isEmpty()) {
                throw new UserCreationException("Plan name is required.");
            }
            if (plan.getPlanAbout() == null || plan.getPlanAbout().isEmpty()) {
                throw new UserCreationException("Plan description is required.");
            }
            if (plan.getPlanType() == null || plan.getPlanType().isEmpty()) {
                throw new UserCreationException("Plan type is required.");
            }
            if (plan.getPlanDuration() == null) {
                throw new UserCreationException("Plan duration is required.");
            }
            Instant instantNow = Instant.now();
            plan.setPlanCreatedAt(instantNow);
            plan.setPlanUpdatedAt(instantNow);
            return planRepo.save(plan);
        } catch (Exception e) {
            throw new UserCreationException("Error creating new Plan: " + e.getMessage());
        }
    }

    @Override
    public Plan updatePlan(Plan planUpdate, ObjectId planId) {
        Plan existingPlan = planRepo.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + planId));
        /*existingPlan.setPlanName(planUpdate.getPlanName());
        existingPlan.setPlanAbout(planUpdate.getPlanAbout());
        existingPlan.setPlanSlogan(planUpdate.getPlanSlogan());
        existingPlan.setPlanType(planUpdate.getPlanType());
        existingPlan.setOptionalBenefits(planUpdate.getOptionalBenefits());
        existingPlan.setPlanRecommended(planUpdate.getPlanRecommended());
        existingPlan.setPlanDuration(planUpdate.getPlanDuration());
        existingPlan.setPlanDurationUnit(planUpdate.getPlanDurationUnit());
        existingPlan.setClaimScenarios(planUpdate.getClaimScenarios());
        existingPlan.setDocumentName(planUpdate.getDocumentName());
        existingPlan.setPlanBenefits(planUpdate.getPlanBenefits());
        existingPlan.setPlanServiceCoverage(planUpdate.getPlanServiceCoverage());
        existingPlan.setPlanURL(planUpdate.getPlanURL());
        existingPlan.setPlanAdvertisement(planUpdate.getPlanAdvertisement());
        existingPlan.setPlanDocuments(planUpdate.getPlanDocuments());*/
        try {
            if (planUpdate.getPlanName() != null) {
                existingPlan.setPlanName(planUpdate.getPlanName());
            }
            if (planUpdate.getPlanAbout() != null) {
                existingPlan.setPlanAbout(planUpdate.getPlanAbout());
            }
            if (planUpdate.getPlanSlogan() != null) {
                existingPlan.setPlanSlogan(planUpdate.getPlanSlogan());
            }
            if (planUpdate.getPlanType() != null) {
                existingPlan.setPlanType(planUpdate.getPlanType());
            }
            if (planUpdate.getOptionalBenefits() != null) {
                existingPlan.setOptionalBenefits(planUpdate.getOptionalBenefits());
            }
            if (planUpdate.getPlanRecommended() != null) {
                existingPlan.setPlanRecommended(planUpdate.getPlanRecommended());
            }
            if (planUpdate.getPlanDuration() != null) {
                existingPlan.setPlanDuration(planUpdate.getPlanDuration());
            }
            if (planUpdate.getPlanDurationUnit() != null) {
                existingPlan.setPlanDurationUnit(planUpdate.getPlanDurationUnit());
            }
            if (planUpdate.getClaimScenarios() != null) {
                existingPlan.setClaimScenarios(planUpdate.getClaimScenarios());
            }
            if (planUpdate.getDocumentName() != null) {
                existingPlan.setDocumentName(planUpdate.getDocumentName());
            }
            if (planUpdate.getPlanBenefits() != null) {
                existingPlan.setPlanBenefits(planUpdate.getPlanBenefits());
            }
            if (planUpdate.getPlanServiceCoverage() != null) {
                existingPlan.setPlanServiceCoverage(planUpdate.getPlanServiceCoverage());
            }
            if (planUpdate.getPlanURL() != null) {
                existingPlan.setPlanURL(planUpdate.getPlanURL());
            }
            if (planUpdate.getPlanAdvertisement() != null) {
                existingPlan.setPlanAdvertisement(planUpdate.getPlanAdvertisement());
            }
            if (planUpdate.getPlanDocuments() != null) {
                existingPlan.setPlanDocuments(planUpdate.getPlanDocuments());
            }

            Instant instantNow = Instant.now();
            existingPlan.setPlanUpdatedAt(instantNow);
            planRepo.save(existingPlan);
            return existingPlan;
        } catch (Exception e) {
            throw new UserCreationException("Error update Plan: " + e.getMessage());
        }
    }
    @Override
    public Plan updatePlanImageDocUrl(ObjectId planId, List<Plan.documents> listDoc) {
        Plan existingPlan = planRepo.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + planId));
        try {
            Instant instantNow = Instant.now();
            existingPlan.setPlanUpdatedAt(instantNow);
            existingPlan.setPlanDocuments(listDoc);
            planRepo.save(existingPlan);
            return existingPlan;
        } catch (Exception e) {
            throw new UserCreationException("Error update Plan: " + e.getMessage());
        }
    }
    @Override
    public Plan updatePlanImagePlanUrl(ObjectId planId, List<String> listPlanUrl) {
        Plan existingPlan = planRepo.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + planId));
        try {
            Instant instantNow = Instant.now();
            existingPlan.setPlanUpdatedAt(instantNow);
            existingPlan.setPlanURL(listPlanUrl);
            planRepo.save(existingPlan);
            return existingPlan;
        } catch (Exception e) {
            throw new UserCreationException("Error update Plan: " + e.getMessage());
        }
    }

    //Service for Customer
    @Override
    public List<PlanResDTO> getAllPlans() {
        List<Plan> plans = planRepo.findAll();
        List<PlanResDTO> planResDTOS = plans.stream()
                .map(plan -> plan.convertToPlanResDTO())
                .collect(Collectors.toList());
        return planResDTOS;
    }

    @Override
    public PlanResDTO getPlan(ObjectId planId) {
        Plan plans = planRepo.findById(planId).get();
        return plans.convertToPlanResDTO();
    }

}

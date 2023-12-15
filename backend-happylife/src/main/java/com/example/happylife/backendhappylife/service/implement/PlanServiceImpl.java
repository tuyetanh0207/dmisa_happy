package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
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
    public List<PlanResDTO> getAllPlans() {
        List<Plan> plans = planRepo.findAll();
        List<PlanResDTO> planResDTOS = plans.stream()
                .map(plan -> plan.convertToPlanResDTO()) // Sửa ở đây
                .collect(Collectors.toList());
        return planResDTOS;
    }

    @Override
    public PlanResDTO getPlan(ObjectId planId) {
        Plan plans = planRepo.findById(planId).get();
        PlanResDTO planResDTOS = plans.convertToPlanResDTO();
        return planResDTOS;
    }

    @Override
    public Plan addPlan(Plan plan) {
        if (plan.getPlanName() == null || plan.getPlanName().isEmpty()) {
            throw new UserCreationException("Plan name is required.");
        }
        if (plan.getPlanAbout() == null || plan.getPlanAbout().isEmpty()) {
            throw new UserCreationException("Plan description is required.");
        }
        if (plan.getPlanPrice() == null) {
            throw new UserCreationException("Plan price is required.");
        }
        if (plan.getPlanType() == null || plan.getPlanType().isEmpty()) {
            throw new UserCreationException("Plan type is required.");
        }
        if (plan.getPlanDuration() == null) {
            throw new UserCreationException("Plan duration is required.");
        }
        try {
            Instant instantNow = Instant.now();
            plan.setPlanCreatedAt(instantNow);
            plan.setPlanUpdatedAt(instantNow);
            return planRepo.save(plan);
        } catch (Exception e) {
            throw new UserCreationException("Error creating new Plan: " + e.getMessage());
        }
    }

    @Override
    public Plan updatePlan(Plan planUpdateDTO, ObjectId planId) {
        Plan existingPlan = planRepo.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + planId));
        existingPlan.setPlanName(planUpdateDTO.getPlanName());
        existingPlan.setPlanAbout(planUpdateDTO.getPlanAbout());
        existingPlan.setPlanPrice(planUpdateDTO.getPlanPrice());
        existingPlan.setPlanType(planUpdateDTO.getPlanType());
        existingPlan.setPlanRecommended(planUpdateDTO.getPlanRecommended());
        existingPlan.setPlanDuration(planUpdateDTO.getPlanDuration());
        existingPlan.setPlanDurationUnit(planUpdateDTO.getPlanDurationUnit());
        existingPlan.setPlanBenefits(planUpdateDTO.getPlanBenefits());
        existingPlan.setPlanServiceCoverage(planUpdateDTO.getPlanServiceCoverage());
        existingPlan.setPlanURL(planUpdateDTO.getPlanURL());
        Instant instantNow = Instant.now();
        existingPlan.setPlanUpdatedAt(instantNow);
        planRepo.save(existingPlan);
        return existingPlan;
    }
}

package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.PlanRepo;
import com.example.happylife.backendhappylife.service.MyService;
import com.example.happylife.backendhappylife.service.PlanService;
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
    public Plan getPlan(ObjectId PlanId) {
        return planRepo.findById(PlanId).get();
    }
    /*@Override
    public List<Plan> getPlanByName(String PlanName) {
        return PlanRepo.getPlanByName(PlanName);
    }*/
 /*   @Override
    public Plan addPlan(Plan Plan) {
        return planRepo.save(Plan);
    }
*/
    @Override
    public Plan deletePlan(ObjectId PlanId) {
        Plan Plan = planRepo.findById(PlanId).get();
        planRepo.delete(Plan);
        return Plan;
    }

    @Override
    public Plan updatePlan(ObjectId PlanId, Plan Plan) {
        Plan PlanVar = planRepo.findById(PlanId).get();

        PlanVar.setPlanName(Plan.getPlanName());
        PlanVar.setPlanAbout(Plan.getPlanAbout());
        PlanVar.setPlanUpdatedAt(Plan.getPlanUpdatedAt());
        PlanVar.setPlanPrice(Plan.getPlanPrice());
        PlanVar.setPlanType(Plan.getPlanType());
        PlanVar.setPlanRecommended(Plan.getPlanRecommended());
        PlanVar.setPlanDuration(Plan.getPlanDuration());
        PlanVar.setPlanBenefits(Plan.getPlanBenefits());
        PlanVar.setPlanServiceCoverage(Plan.getPlanServiceCoverage());
        PlanVar.setPlanURL(Plan.getPlanURL());

        planRepo.save(PlanVar);
        return PlanVar;
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
        if (plan.getPlanDuration() == null || plan.getPlanDuration().isEmpty()) {
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
}

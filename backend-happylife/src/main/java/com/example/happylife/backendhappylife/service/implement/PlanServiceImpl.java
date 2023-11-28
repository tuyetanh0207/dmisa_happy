package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.repo.PlanRepo;
import com.example.happylife.backendhappylife.service.PlanService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanServiceImpl implements PlanService {
    @Autowired
    private PlanRepo planRepo;
    @Override
    public List<Plan> getAllPlan() {
        return planRepo.findAll();
    }

    @Override
    public Plan getPlan(ObjectId PlanId) {
        return planRepo.findById(PlanId).get();
    }
    /*@Override
    public List<Plan> getPlanByName(String PlanName) {
        return PlanRepo.getPlanByName(PlanName);
    }*/
    @Override
    public Plan addPlan(Plan Plan) {
        return planRepo.save(Plan);
    }

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
        PlanVar.setPlanAboutupdatedAt(Plan.getPlanAboutupdatedAt());
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
}

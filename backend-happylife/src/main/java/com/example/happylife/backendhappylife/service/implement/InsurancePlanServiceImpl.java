package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.entity.InsurancePlan;
import com.example.happylife.backendhappylife.repo.InsurancePlanRepo;
import com.example.happylife.backendhappylife.service.InsurancePlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InsurancePlanServiceImpl implements InsurancePlanService {
    @Autowired
    private InsurancePlanRepo insurancePlanRepo;
    @Override
    public List<InsurancePlan> getAllInsurancePlan() {
        return insurancePlanRepo.findAll();
    }

    @Override
    public InsurancePlan getInsurancePlan(int insurancePlanId) {
        return insurancePlanRepo.findById(insurancePlanId).get();
    }

    @Override
    public InsurancePlan addInsurancePlan(InsurancePlan insurancePlan) {
        return insurancePlanRepo.save(insurancePlan);
    }

    @Override
    public InsurancePlan deleteInsurancePlan(int insurancePlanId) {
        InsurancePlan insurancePlan = insurancePlanRepo.findById(insurancePlanId).get();
        insurancePlanRepo.delete(insurancePlan);
        return insurancePlan;
    }

    @Override
    public InsurancePlan updateInsurancePlan(int insurancePlanId, InsurancePlan insurancePlan) {
        InsurancePlan insurancePlanVar = insurancePlanRepo.findById(insurancePlanId).get();

        insurancePlanVar.setInsurancePlanName(insurancePlan.getInsurancePlanName());
        insurancePlanVar.setInsurancePlanAbout(insurancePlan.getInsurancePlanAbout());
        insurancePlanVar.setInsurancePlanAboutupdatedAt(insurancePlan.getInsurancePlanAboutupdatedAt());
        insurancePlanVar.setInsurancePlanPrice(insurancePlan.getInsurancePlanPrice());
        insurancePlanVar.setInsurancePlanType(insurancePlan.getInsurancePlanType());
        insurancePlanVar.setInsurancePlanRecommended(insurancePlan.getInsurancePlanRecommended());
        insurancePlanVar.setInsurancePlanDuration(insurancePlan.getInsurancePlanDuration());
        insurancePlanVar.setInsurancePlanBenefits(insurancePlan.getInsurancePlanBenefits());
        insurancePlanVar.setInsurancePlanServiceCoverage(insurancePlan.getInsurancePlanServiceCoverage());
        insurancePlanVar.setInsurancePlanURL(insurancePlan.getInsurancePlanURL());

        insurancePlanRepo.save(insurancePlanVar);
        return insurancePlanVar;
    }
}

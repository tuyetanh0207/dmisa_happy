package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.entity.InsurancePlan;

import java.util.List;
import java.util.Optional;

public interface InsurancePlanService {
    public List<InsurancePlan> getAllInsurancePlan();
    public InsurancePlan getInsurancePlan(int insurancePlanId);
    public InsurancePlan addInsurancePlan(InsurancePlan insurancePlan);
    public InsurancePlan deleteInsurancePlan(int insurancePlanId);
    public InsurancePlan updateInsurancePlan(int insurancePlanId, InsurancePlan insurancePlan);
}

package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.entity.Plan;
import org.bson.types.ObjectId;

import java.util.List;

public interface PlanService {
    public List<Plan> getAllPlan();
    public Plan getPlan(ObjectId PlanId);
    //public List<Plan> getPlanByName(String PlanName);
    public Plan addPlan(Plan plan);
    public Plan deletePlan(ObjectId PlanId);
    public Plan updatePlan(ObjectId PlanId, Plan plan);
}

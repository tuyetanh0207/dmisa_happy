package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import org.bson.types.ObjectId;

import java.util.List;

public interface PlanService {
    public Plan getPlan(ObjectId PlanId);
    //public List<Plan> getPlanByName(String PlanName);
    public Plan addPlan(Plan plan);
    public Plan deletePlan(ObjectId PlanId);
    public Plan updatePlan(ObjectId PlanId, Plan plan);
    List<PlanResDTO> getAllPlans();
<<<<<<< Updated upstream
=======

    public Plan buyPlan(Plan plan, User user);
    //public List<Plan> getAllPlan();
>>>>>>> Stashed changes
}

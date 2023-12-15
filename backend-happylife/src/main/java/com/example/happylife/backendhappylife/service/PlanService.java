package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.User;
import org.bson.types.ObjectId;

import java.util.List;

public interface PlanService {
    //public List<Plan> getPlanByName(String PlanName);
    public Plan addPlan(Plan plan);
    public Plan deletePlan(ObjectId PlanId);

    List<PlanResDTO> getAllPlans();
    public PlanResDTO getPlan(ObjectId planId);

    Plan updatePlan(Plan planUpdateDTO, ObjectId planId);
}

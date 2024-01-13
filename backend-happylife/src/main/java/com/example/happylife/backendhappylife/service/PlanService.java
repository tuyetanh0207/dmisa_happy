package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.User;
import org.bson.types.ObjectId;

import java.util.List;

public interface PlanService {
    //public List<Plan> getPlanByName(String PlanName);
    public Plan addPlan(UserResDTO user, Plan plan);
    public Plan deletePlan(ObjectId PlanId);
    List<Plan> getAllPlans();
    public Plan getPlan(ObjectId planId);
    Plan updatePlan(Plan planUpdate, ObjectId planId);

    Plan updatePlanImage(ObjectId planId,List<Plan.documents> listDoc);
}

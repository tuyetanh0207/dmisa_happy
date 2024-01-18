package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import org.bson.types.ObjectId;

import java.util.List;

public interface PlanService {
    //public List<Plan> getPlanByName(String PlanName);
    public Plan addPlan(UserResDTO user, Plan plan);
    public Plan deletePlan(ObjectId PlanId);
    List<PlanResDTO> getAllPlans();
    public PlanResDTO getPlan(ObjectId planId);
    Plan updatePlan(Plan planUpdate, ObjectId planId);

    Plan updatePlanImageDocUrl(ObjectId planId,List<Plan.documents> listDoc);

    Plan updatePlanImagePlanUrl(ObjectId planId, List<String> listPlanUrl);

    PlanResDTO getPlanByRegisId(UserResDTO userVar, ObjectId regisId);
}

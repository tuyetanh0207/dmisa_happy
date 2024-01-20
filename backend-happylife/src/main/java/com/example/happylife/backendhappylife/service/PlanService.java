package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
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

    //Service for upload file and image
    //PlanResDTO updatePlanImageDocUrl(ObjectId planId,List<String> uploadedUrls,List<SectionFileCount> sectionFileCounts);

    //Service for upload file and image
    PlanResDTO updatePlanImageOrFileDocUrl(ObjectId planId,
                                           List<String> uploadedUrls,
                                           List<SectionFileCount> sectionFileCounts);

    PlanResDTO updatePlanFileDocUrl(ObjectId planId,
                                    List<String> uploadedUrls,
                                    List<SectionFileCount> sectionFileCounts);

    //PlanResDTO updatePlanImagePlanUrl(ObjectId planId, List<String> listPlanUrl);

    PlanResDTO getPlanByRegisId(UserResDTO userVar, ObjectId regisId);

    //PlanURL
    PlanResDTO updatePlanImageOrFilePlanUrl(ObjectId planId,
                                            List<String> listPlanUrl);

    PlanResDTO updatePlanFilePlanUrl(ObjectId planId,
                                     List<String> listPlanUrl);
}

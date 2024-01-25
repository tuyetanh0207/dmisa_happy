package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.Plan;
import org.bson.types.ObjectId;

import java.util.List;

public interface PlanService {
    //public List<Plan> getPlanByName(String PlanName);
    public PlanResDTO addPlan(UserResDTO user, PlanCreateDTO plan);
    public void deletePlan(ObjectId PlanId);
    List<PlanResDTO> getAllPlans();
    public PlanResDTO getPlan(ObjectId planId);
    PlanResDTO updatePlan(PlanUpdateDTO planUpdate, ObjectId planId);

    //Service for upload file and image
    //PlanResDTO updatePlanImageDocUrl(ObjectId planId,List<String> uploadedUrls,List<SectionFileCount> sectionFileCounts);

    //Service for upload file and image
    PlanResDTO updatePlanImageOrFileDocUrl(ObjectId planId,
                                           List<String> uploadedUrls,
                                           List<SectionFileCount> sectionFileCounts);

   /* PlanResDTO updatePlanFileDocUrl(ObjectId planId,
                                    List<String> uploadedUrls,
                                    List<SectionFileCount> sectionFileCounts);*/

    //PlanResDTO updatePlanImagePlanUrl(ObjectId planId, List<String> listPlanUrl);

    PlanResDTO getPlanByRegisId(UserResDTO userVar, ObjectId regisId);

    //PlanURL
    PlanResDTO updatePlanImageOrFilePlanUrl(ObjectId planId,
                                            List<String> listPlanUrl);

    PlanResDTO updatePlanFilePlanUrl(ObjectId planId,
                                     List<String> listPlanUrl);
}

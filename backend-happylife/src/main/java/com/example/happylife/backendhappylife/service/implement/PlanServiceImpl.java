package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.RegistrationEventEnum;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.PlanRepo;
import com.example.happylife.backendhappylife.service.PlanService;
import com.example.happylife.backendhappylife.service.handlerEvent.classEvent.RegistrationEvent;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class PlanServiceImpl implements PlanService {
    @Autowired
    private PlanRepo planRepo;
    @Autowired
    private ApplicationEventPublisher publisher;
    @Override
    public Plan deletePlan(ObjectId PlanId) {
        Plan Plan = planRepo.findById(PlanId).get();
        planRepo.delete(Plan);
        return Plan;
    }

    @Override
    public Plan addPlan(UserResDTO user, Plan plan) {
        try {
            if (plan.getPlanName() == null || plan.getPlanName().isEmpty()) {
                throw new UserCreationException("Plan name is required.");
            }
            if (plan.getPlanAbout() == null || plan.getPlanAbout().isEmpty()) {
                throw new UserCreationException("Plan description is required.");
            }
            if (plan.getPlanType() == null || plan.getPlanType().isEmpty()) {
                throw new UserCreationException("Plan type is required.");
            }
            if (plan.getPlanDuration() == null) {
                throw new UserCreationException("Plan duration is required.");
            }
            Instant instantNow = Instant.now();
            plan.setPlanCreatedAt(instantNow);
            plan.setPlanUpdatedAt(instantNow);
            return planRepo.save(plan);
        } catch (Exception e) {
            throw new UserCreationException("Error creating new Plan: " + e.getMessage());
        }
    }

    @Override
    public Plan updatePlan(Plan planUpdate, ObjectId planId) {
        Plan existingPlan = planRepo.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + planId));

        try {
            if (planUpdate.getPlanName() != null) {
                existingPlan.setPlanName(planUpdate.getPlanName());
            }
            if (planUpdate.getPlanAbout() != null) {
                existingPlan.setPlanAbout(planUpdate.getPlanAbout());
            }
            if (planUpdate.getPlanSlogan() != null) {
                existingPlan.setPlanSlogan(planUpdate.getPlanSlogan());
            }
            if (planUpdate.getPlanType() != null) {
                existingPlan.setPlanType(planUpdate.getPlanType());
            }
            if (planUpdate.getOptionalBenefits() != null) {
                existingPlan.setOptionalBenefits(planUpdate.getOptionalBenefits());
            }
            if (planUpdate.getPlanRecommended() != null) {
                existingPlan.setPlanRecommended(planUpdate.getPlanRecommended());
            }
            if (planUpdate.getPlanDuration() != null) {
                existingPlan.setPlanDuration(planUpdate.getPlanDuration());
            }
            if (planUpdate.getPlanDurationUnit() != null) {
                existingPlan.setPlanDurationUnit(planUpdate.getPlanDurationUnit());
            }
            if (planUpdate.getClaimScenarios() != null) {
                existingPlan.setClaimScenarios(planUpdate.getClaimScenarios());
            }
            if (planUpdate.getDocumentName() != null) {
                existingPlan.setDocumentName(planUpdate.getDocumentName());
            }
            if (planUpdate.getPlanBenefits() != null) {
                existingPlan.setPlanBenefits(planUpdate.getPlanBenefits());
            }
            if (planUpdate.getPlanServiceCoverage() != null) {
                existingPlan.setPlanServiceCoverage(planUpdate.getPlanServiceCoverage());
            }
            if (planUpdate.getPlanURL() != null) {
                existingPlan.setPlanURL(planUpdate.getPlanURL());
            }
            if (planUpdate.getPlanAdvertisement() != null) {
                existingPlan.setPlanAdvertisement(planUpdate.getPlanAdvertisement());
            }
            if (planUpdate.getPlanDocuments() != null) {
                existingPlan.setPlanDocuments(planUpdate.getPlanDocuments());
            }

            Instant instantNow = Instant.now();
            existingPlan.setPlanUpdatedAt(instantNow);
            planRepo.save(existingPlan);
            return existingPlan;
        } catch (Exception e) {
            throw new UserCreationException("Error update Plan: " + e.getMessage());
        }
    }

    //Service for Customer
    @Override
    public List<PlanResDTO> getAllPlans() {
        List<Plan> plans = planRepo.findAll();
        List<PlanResDTO> planResDTOS = plans.stream()
                .map(plan -> plan.convertToPlanResDTO())
                .collect(Collectors.toList());
        return planResDTOS;
    }

    @Override
    public PlanResDTO getPlan(ObjectId planId) {
        Plan plans = planRepo.findById(planId).get();
        return plans.convertToPlanResDTO();
    }

    @Override
    public PlanResDTO getPlanByRegisId(UserResDTO userVar, ObjectId regisId){
        try{
            User user = new User().convertResToUser(userVar);
            Registration regis = new Registration();
            regis.setRegisId(regisId);
            RegistrationEventEnum method = RegistrationEventEnum.getPlanWithRegisId;

            CompletableFuture<Registration> regisEventReturn = new CompletableFuture<>();

            Registration existingRegis;
            RegistrationEvent.RegistrationGetCallback callback = registration -> {
                regisEventReturn.complete(registration);
            };
            publisher.publishEvent(new RegistrationEvent(regis,null, method,callback));
            //System.out.println("Id : " + regisEventReturn.get().getCustomerInfo());
            if(user.getId().toString().equals(regisEventReturn.get().getCustomerInfo().getId())){
                ObjectId planId = new ObjectId(regisEventReturn.get().getProductInfo().getPlanId());
                //System.out.println("Id : " + planId.toString());
                if(!planId.toString().isEmpty()){
                    Plan existingPlan = planRepo.findById(planId)
                            .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + regisId));
                    return existingPlan.convertToPlanResDTO();
                }else return null;
            }
           else{
                throw  new UserCreationException("Error get registration");
            }
        } catch (Exception e){
            throw  new UserCreationException("Error get registration: "+ e.getMessage());
        }
    }
    //Service for upload file and image
    @Override
    public PlanResDTO updatePlanImageOrFileDocUrl(ObjectId planId,
                                                  List<String> uploadedUrls,
                                                  List<SectionFileCount> sectionFileCounts) {
        Plan existingPlan = planRepo.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + planId));
        try {
            Iterator<String> urlIterator = uploadedUrls.iterator();
            List<Plan.documents> documentList = new ArrayList<>();

            for (SectionFileCount fileCount : sectionFileCounts) {
                Plan.documents document = new Plan.documents();
                List<String> docUrls = new ArrayList<>();
                for (int i = 0; i < fileCount.getFileCount(); i++) {
                    if (urlIterator.hasNext()) {
                        docUrls.add(urlIterator.next());
                    }
                }
                document.setDocTitle(fileCount.getSection().trim());
                //System.out.println("Value : " + fileCount.getSection().trim());
                document.setDocUrl(docUrls);
                documentList.add(document);
            }
            Instant instantNow = Instant.now();
            existingPlan.setPlanUpdatedAt(instantNow);

            List<Plan.documents> docLists = new ArrayList<>();
            if(existingPlan.getPlanDocuments() == null) docLists.addAll(documentList);
            else {
                docLists = existingPlan.getPlanDocuments();
                List<Plan.documents> toAdd = new ArrayList<>();

                for (Plan.documents docAdd : documentList) {
                    boolean isPresent = false;
                    for (Plan.documents doc : docLists) {
                        if (doc.getDocTitle().equals(docAdd.getDocTitle())) {
                            if (doc.getDocUrl() == null) {
                                doc.setDocUrl(new ArrayList<>()); // Khởi tạo nếu null
                            }
                            doc.getDocUrl().addAll(docAdd.getDocUrl());
                            isPresent = true;
                            break;
                        }
                    }
                    if (!isPresent) {
                        toAdd.add(docAdd);
                    }
                }
                docLists.addAll(toAdd);
            }

            existingPlan.setPlanDocuments(docLists);
            return planRepo.save(existingPlan).convertToPlanResDTO();
        } catch (Exception e) {
            throw new UserCreationException("Error update Plan: " + e.getMessage());
        }
    }
    @Override
    public PlanResDTO updatePlanFileDocUrl(ObjectId planId,
                                            List<String> uploadedUrls,
                                            List<SectionFileCount> sectionFileCounts) {
        Plan existingPlan = planRepo.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + planId));
        try {
            Iterator<String> urlIterator = uploadedUrls.iterator();
            List<Plan.documents> documentList = new ArrayList<>();

            for (SectionFileCount fileCount : sectionFileCounts) {
                Plan.documents document = new Plan.documents();
                List<String> docUrls = new ArrayList<>();
                for (int i = 0; i < fileCount.getFileCount(); i++) {
                    if (urlIterator.hasNext()) {
                        docUrls.add(urlIterator.next());
                    }
                }
                document.setDocTitle(fileCount.getSection().trim());
                //System.out.println("Value : " + fileCount.getSection().trim());
                document.setDocUrl(docUrls);
                documentList.add(document);
            }
            Instant instantNow = Instant.now();
            existingPlan.setPlanUpdatedAt(instantNow);

            List<Plan.documents> docLists = new ArrayList<>();
            if(existingPlan.getPlanDocuments() == null) docLists.addAll(documentList);
            else {
                docLists = existingPlan.getPlanDocuments();
                List<Plan.documents> toAdd = new ArrayList<>();

                for (Plan.documents docAdd : documentList) {
                    boolean isPresent = false;
                    for (Plan.documents doc : docLists) {
                        if (doc.getDocTitle().equals(docAdd.getDocTitle())) {
                            if (doc.getDocUrl() == null) {
                                doc.setDocUrl(new ArrayList<>()); // Khởi tạo nếu null
                            }
                            doc.getDocUrl().addAll(docAdd.getDocUrl());
                            isPresent = true;
                            break;
                        }
                    }
                    if (!isPresent) {
                        toAdd.add(docAdd);
                    }
                }
                docLists.addAll(toAdd);
            }

            existingPlan.setPlanDocuments(docLists);
            return planRepo.save(existingPlan).convertToPlanResDTO();
        } catch (Exception e) {
            throw new UserCreationException("Error update Plan: " + e.getMessage());
        }
    }
   //PlanURL
    @Override
    public PlanResDTO updatePlanImageOrFilePlanUrl(ObjectId planId,
                                                   List<String> listPlanUrl) {
        Plan existingPlan = planRepo.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + planId));
        try {
            Instant instantNow = Instant.now();
            existingPlan.setPlanUpdatedAt(instantNow);
            List<String> docLists = new ArrayList<>();
            if(existingPlan.getPlanURL() == null) docLists.addAll(listPlanUrl);
            else {
                docLists = existingPlan.getPlanURL();
                docLists.addAll(listPlanUrl);
            }
            existingPlan.setPlanURL(docLists);
            planRepo.save(existingPlan);
            return existingPlan.convertToPlanResDTO();
        } catch (Exception e) {
            throw new UserCreationException("Error update Plan: " + e.getMessage());
        }
    }
    @Override
    public PlanResDTO updatePlanFilePlanUrl(ObjectId planId,
                                            List<String> listPlanUrl) {
        Plan existingPlan = planRepo.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + planId));
        try {
            Instant instantNow = Instant.now();
            existingPlan.setPlanUpdatedAt(instantNow);
            List<String> docLists = new ArrayList<>();
            if(existingPlan.getPlanURL() == null) docLists.addAll(listPlanUrl);
            else {
                docLists = existingPlan.getPlanURL();
                docLists.addAll(listPlanUrl);
            }
            existingPlan.setPlanURL(docLists);            planRepo.save(existingPlan);
            return existingPlan.convertToPlanResDTO();
        } catch (Exception e) {
            throw new UserCreationException("Error update Plan: " + e.getMessage());
        }
    }
}

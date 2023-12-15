package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.PlanService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/plans")
public class PlanController {
    @Autowired
    private PlanService planService;

 /*   @Autowired
    private SearchService searchService;*/

    @GetMapping("/{PlanId}")
    public Plan getPlan(@PathVariable ObjectId PlanId){
        return planService.getPlan(PlanId);
    };
    @GetMapping("/")
    public ResponseEntity<List<PlanResDTO>> getAllPlans() {
        return ResponseEntity.ok(planService.getAllPlans());
    }
/*    @GetMapping("/getPlanByName/{PlanName}")
    public  List<Plan> getPlanByName(String PlanName){
        return searchService.getPlanByName(PlanName);
    };*/
    /*@GetMapping("/getPlanByName/{PlanName}")
    public List<Plan> getPlanByName(@PathVariable String PlanName){
       *//* // Get all insurance Plans from the service
        List<Plan> allPlans = PlanService.getAllPlan();

        // Filter the insurance Plans based on the search term
        List<Plan> filteredPlans = allPlans.stream().
                filter(Plan -> Plan.getPlanName().toLowerCase().contains(PlanName.toLowerCase()))
                .collect(Collectors.toList());

        // Return the filtered list
        return filteredPlans;*//*
        return null;
    };*/
    @PostMapping("/create")
    public ResponseEntity<PlanCreateDTO> addPlan(@RequestBody PlanCreateDTO planCreateDTO) {
        Plan plan = new Plan();
        plan.convertToPlan(planCreateDTO);
        Plan savedPlan = planService.addPlan(plan);
        PlanCreateDTO planCreDTO = plan.convertToPlanCreateDTO();
        return ResponseEntity.ok(planCreDTO);
    }

    /*@PutMapping("/update/{PlanId}")
    public Plan updatePlan(@PathVariable ObjectId PlanId, @RequestBody Plan Plan){
        return planService.updatePlan(PlanId,Plan);
    }*/
  /*  @PutMapping("/update/{planId}")
    public ResponseEntity<PlanResDTO> updatePlan(@PathVariable ObjectId planId,
                                                 @RequestBody PlanUpdateDTO planUpdateDTO) {
        Plan updatedPlan = planService.updatePlan(planId, planUpdateDTO);
        PlanResDTO planResDTO = updatedPlan.convertToPlanResDTO();
        return ResponseEntity.ok(planResDTO);
    }*/
    @DeleteMapping("/delete/{PlanId}")
    public Plan deletePlan(@PathVariable ObjectId PlanId){
        return planService.deletePlan(PlanId);
    };
}


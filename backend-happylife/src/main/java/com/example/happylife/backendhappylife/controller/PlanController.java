package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.service.PlanService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Plans")
public class PlanController {
    @Autowired
    private PlanService planService;

 /*   @Autowired
    private SearchService searchService;*/

    @GetMapping("/all")
    public List<Plan> getAllPlan(){
        return planService.getAllPlan();
    };
    @GetMapping("/getPlan/{PlanId}")
    public Plan getPlan(@PathVariable ObjectId PlanId){
        return planService.getPlan(PlanId);
    };

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
    @PostMapping("/insert")
    public Plan addPlan(@RequestBody Plan Plan){
        return planService.addPlan(Plan);
    };
    @PutMapping("/update/{PlanId}")
    public Plan updatePlan(@PathVariable ObjectId PlanId, @RequestBody Plan Plan){
        return planService.updatePlan(PlanId,Plan);
    }
    @DeleteMapping("/delete/{PlanId}")
    public Plan deletePlan(@PathVariable ObjectId PlanId){
        return planService.deletePlan(PlanId);
    };
}


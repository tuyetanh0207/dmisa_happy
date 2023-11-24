package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.entity.InsurancePlan;
import com.example.happylife.backendhappylife.service.InsurancePlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/InsurancePlans")
public class InsurancePlanController {
    @Autowired
    private InsurancePlanService insurancePlanService;

    @GetMapping("/all")
    public List<InsurancePlan> getAllInsurancePlan(){
        return insurancePlanService.getAllInsurancePlan();
    };

    @PostMapping("/insert")
    public InsurancePlan addInsurancePlan(@RequestBody InsurancePlan insurancePlan){
        return insurancePlanService.addInsurancePlan(insurancePlan);
    };
    @PutMapping("/update/{insurancePlanId}")
    public InsurancePlan updateInsurancePlan(@PathVariable int insurancePlanId,@RequestBody InsurancePlan insurancePlan){
        return insurancePlanService.updateInsurancePlan(insurancePlanId,insurancePlan);
    }
    @DeleteMapping("/delete/{insurancePlanId}")
    public InsurancePlan deleteInsurancePlan(@PathVariable int insurancePlanId){
        return insurancePlanService.deleteInsurancePlan(insurancePlanId);
    };
}


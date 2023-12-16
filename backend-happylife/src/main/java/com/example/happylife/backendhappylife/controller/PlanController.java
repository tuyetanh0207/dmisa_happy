package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.service.PlanService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})

@RestController
@RequestMapping("/api/v1/plans")
public class PlanController {
    @Autowired
    private PlanService planService;

    //Lấy thông tin chi tiết 1 plan dựa trên planId
    @GetMapping("/{planId}")
    public ResponseEntity<PlanResDTO> getPlan(@PathVariable ObjectId planId){
        return ResponseEntity.ok(planService.getPlan(planId));
    };

    //Lấy thông tin toàn bộ plan
    @GetMapping("")
    public ResponseEntity<List<PlanResDTO>> getAllPlans() {
        return ResponseEntity.ok(planService.getAllPlans());
    };

    //Tạp mới một plan
    @PostMapping("/create")
    public ResponseEntity<PlanCreateDTO> addPlan(@RequestBody PlanCreateDTO planCreateDTO) {
        Plan plan = new Plan();
        Plan planCreated = plan.convertCreToPlan(planCreateDTO);
        Plan savedPlan = planService.addPlan(planCreated);
        PlanCreateDTO planCreDTO = savedPlan.convertToPlanCreateDTO();
        return ResponseEntity.ok(planCreDTO);
    };

    //Update 1 plan dựa trên planId
    @PutMapping("/update/{planId}")
    public ResponseEntity<PlanUpdateDTO> updatePlan(@PathVariable ObjectId planId,
                                                 @RequestBody PlanUpdateDTO planUpdateDTO) {
        Plan plan = new Plan();
        Plan planUpdated = plan.convertUpdToPlan(planUpdateDTO);
        Plan savedPlan = planService.updatePlan(planUpdated, planId);
        PlanUpdateDTO planUpdDTO = savedPlan.convertToPlanUpdateDTO();
        return ResponseEntity.ok(planUpdDTO);
    };

    //Xóa 1 Plan dựa trên planId
    @DeleteMapping("/delete/{planId}")
    public Plan deletePlan(@PathVariable ObjectId PlanId){
        return planService.deletePlan(PlanId);
    };
}


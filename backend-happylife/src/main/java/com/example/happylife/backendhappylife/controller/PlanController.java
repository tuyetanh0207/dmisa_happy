package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisCreateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.service.PlanService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})

@RestController
@RequestMapping("/api/v1/plans")
public class PlanController {
    @Autowired
    private PlanService planService;


        //Lấy thông tin chi tiết 1 plan dựa trên planId
    @GetMapping("/{planId}")
    public ResponseEntity<PlanResDTO> getPlan(@PathVariable ObjectId planId){
        PlanResDTO planResDTOS = planService.getPlan(planId).convertToPlanResDTO();
        return ResponseEntity.ok(planResDTOS);
    };

    //Lấy thông tin toàn bộ plan
    @GetMapping("")
    public ResponseEntity<List<PlanResDTO>> getAllPlans() {
        List<PlanResDTO> planResDTOS = planService.getAllPlans().stream()
                .map(plan -> plan.convertToPlanResDTO())
                .collect(Collectors.toList());
        return ResponseEntity.ok(planResDTOS);
    };

    //Tạp mới một plan
    @PostMapping("/create")
    public ResponseEntity<?> addPlan(HttpServletRequest request, @RequestBody PlanCreateDTO planCreateDTO) {
        try {
            User userVar = (User) request.getAttribute("userDetails");
            UserResDTO user = userVar.convertFromUserToUserResDTO();
            if (user.getRole()!= Role.INSUARANCE_MANAGER){

            }
            Plan plan = new Plan();
            Plan planCreated = plan.convertCreToPlan(planCreateDTO);
            Plan savedPlan = planService.addPlan(user, planCreated);
            PlanResDTO resPlan = savedPlan.convertToPlanResDTO();
            return ResponseEntity.ok(resPlan);
        } catch (UserCreationException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }

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


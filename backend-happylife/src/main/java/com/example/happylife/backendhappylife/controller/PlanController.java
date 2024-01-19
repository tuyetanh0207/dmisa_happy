package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.service.FireBaseService;
import com.example.happylife.backendhappylife.service.PlanService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})

@RestController
@RequestMapping("/api/v1/plans")
public class PlanController {
    @Autowired
    private PlanService planService;
    private final FireBaseService firebaseStorageService;
    @Autowired
    public PlanController(FireBaseService firebaseStorageService) {
        this.firebaseStorageService = firebaseStorageService;
    }

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
    @PutMapping("/{planId}/update")
    public ResponseEntity<?> updatePlan(HttpServletRequest request, @PathVariable ObjectId planId,
                                                 @RequestBody PlanUpdateDTO planUpdateDTO) {
        try{
            User userVar = (User) request.getAttribute("userDetails");
            UserResDTO user = userVar.convertFromUserToUserResDTO();
            if (user.getRole()!= Role.INSUARANCE_MANAGER){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only manager can do it!" );
            }
            Plan plan = new Plan();
            Plan planUpdated = plan.convertUpdToPlan(planUpdateDTO);
            Plan savedPlan = planService.updatePlan(planUpdated, planId);
            PlanUpdateDTO planUpdDTO = savedPlan.convertToPlanUpdateDTO();
            return ResponseEntity.ok(planUpdDTO);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }

    };
    //DocUrl
    @PutMapping("/update/{planId}/image-docUrl") // Này Phúc sửa sau
    public ResponseEntity<?> updatePlanImageDocUrl(@PathVariable ObjectId planId,
                                                   @RequestParam("fileCounts") String fileCounts,
                                                   @RequestParam("files") MultipartFile[] files) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<SectionFileCount> _fileCounts = objectMapper.readValue(fileCounts, new TypeReference<List<SectionFileCount>>() {});
        // Lưu các URL của file sau khi upload
        List<String> uploadedUrls = firebaseStorageService.uploadImages(files);
        // Cập nhật thông tin vào Regis và lưu
        PlanResDTO savedPlan = planService.updatePlanImageDocUrl(planId,uploadedUrls,_fileCounts);
        return ResponseEntity.ok(savedPlan);
    };
    @PutMapping("/update/{planId}/file-docUrl") // Này Phúc sửa sau
    public ResponseEntity<?> updatePlanFileDocUrl(@PathVariable ObjectId planId,
                                                  @RequestParam("fileCounts") String fileCounts,
                                                  @RequestParam("files") MultipartFile[] files) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<SectionFileCount> _fileCounts = objectMapper.readValue(fileCounts, new TypeReference<List<SectionFileCount>>() {});
        // Lưu các URL của file sau khi upload
        List<String> uploadedUrls = firebaseStorageService.uploadFiles(files);
        // Cập nhật thông tin vào Regis và lưu
        PlanResDTO savedPlan = planService.updatePlanFileDocUrl(planId,uploadedUrls,_fileCounts);
        return ResponseEntity.ok(savedPlan);
    };
    //PlanURL
    @PutMapping("/update/{planId}/image-planUrl")
    public ResponseEntity<?> updatePlanImagePlanUrl(HttpServletRequest request,
                                                    @PathVariable ObjectId planId,
                                                    @RequestParam("files") MultipartFile[] files) throws IOException {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        //if(userResDTO)
        // Lưu các URL của file sau khi upload
        List<String> uploadedUrls = firebaseStorageService.uploadImages(files);
        // Cập nhật thông tin vào Claim và lưu
        PlanResDTO savedPlan = planService.updatePlanImagePlanUrl(planId,uploadedUrls);
        return ResponseEntity.ok(savedPlan);
    };

    @PutMapping("/update/{planId}/file-planUrl")
    public ResponseEntity<?> updatePlanFilePlanUrl(HttpServletRequest request,
                                                   @PathVariable ObjectId planId,
                                                   @RequestParam("files") MultipartFile[] files) throws IOException {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        //if(userResDTO)
        // Lưu các URL của file sau khi upload
        List<String> uploadedUrls = firebaseStorageService.uploadFiles(files);
        // Cập nhật thông tin vào Claim và lưu
        PlanResDTO savedPlan = planService.updatePlanFilePlanUrl(planId,uploadedUrls);
        return ResponseEntity.ok(savedPlan);
    };


    //Xóa 1 Plan dựa trên planId
    @DeleteMapping("/delete/{planId}")
    public Plan deletePlan(@PathVariable ObjectId PlanId){
        return planService.deletePlan(PlanId);
    };

    //API for Customer

    //Lấy thông tin chi tiết 1 plan dựa trên planId
    @GetMapping("/{planId}")
    public ResponseEntity<?> getPlan(@PathVariable ObjectId planId){
        PlanResDTO planResDTOS = planService.getPlan(planId);
        return ResponseEntity.ok(planResDTOS);
    };

    //Lấy thông tin toàn bộ plan
    @GetMapping("")
    public ResponseEntity<List<PlanResDTO>> getAllPlans() {
        List<PlanResDTO> planResDTOS = planService.getAllPlans();
        return ResponseEntity.ok(planResDTOS);
    };

    @GetMapping("/{regisId}/getPlanByRegisId")
    public ResponseEntity<?> getPlanByRegisId(@PathVariable ObjectId regisId){
        return ResponseEntity.ok(planService.getPlanByRegisId(null, regisId));
    }

    //API for upload image and files
}


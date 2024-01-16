package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.service.FireBaseService;
import com.example.happylife.backendhappylife.service.PlanService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @PutMapping("/update/{planId}")
    public ResponseEntity<PlanUpdateDTO> updatePlan(@PathVariable ObjectId planId,
                                                 @RequestBody PlanUpdateDTO planUpdateDTO) {
        Plan plan = new Plan();
        Plan planUpdated = plan.convertUpdToPlan(planUpdateDTO);
        Plan savedPlan = planService.updatePlan(planUpdated, planId);
        PlanUpdateDTO planUpdDTO = savedPlan.convertToPlanUpdateDTO();
        return ResponseEntity.ok(planUpdDTO);
    };
    @PutMapping("/update/{planId}/image-docUrl") // Này Phúc sửa sau
    public ResponseEntity<PlanUpdateDTO> updatePlanImageDocUrl(@PathVariable ObjectId planId,
                                                               //@RequestPart("plan") PlanUpdateDTO planUpdateDTO,
                                                               @RequestPart("files") MultipartFile[] files) throws IOException {
        // Plan plan = new Plan();
        // Url gửi các thông tin cơ bản và attribute docname có và docurl chỉ mảng rỗng, docurl là mảng rỗng
        // upload file dựa vào số phần tử url của plan/regis/claims
        // giả dụ regis có 4 cái phần tử, nếu mà url đó rỗng thì add vào, còn nếu có rồi thì ko update
        // Plan planUpdated = plan.convertUpdToPlan(planUpdateDTO);
        List<String> docUrls = firebaseStorageService.uploadImages(files);
        List<Plan.documents> documentList = new ArrayList<>();
        List<String> planUrl = firebaseStorageService.uploadImages(files);
        for (String url : docUrls) {
            Plan.documents document = new Plan.documents();
            //document.setDocTitle("Document Title");
            document.setDocUrl(url);
            documentList.add(document);
        }
        //planUpdated.setPlanDocuments(documentList);
        Plan savedPlan = planService.updatePlanImageDocUrl(planId, documentList);
        PlanUpdateDTO planUpdDTO = savedPlan.convertToPlanUpdateDTO();
        return ResponseEntity.ok(planUpdDTO);
    };
    @PutMapping("/update/{planId}/image-planUrl") // Này Phúc sửa sau
    public ResponseEntity<PlanUpdateDTO> updatePlanImagePlanUrl(@PathVariable ObjectId planId,
                                                                //@RequestPart("plan") PlanUpdateDTO planUpdateDTO,
                                                                @RequestPart("files") MultipartFile[] files) throws IOException {
        // Plan plan = new Plan();
        // Url gửi các thông tin cơ bản và attribute docname có và docurl chỉ mảng rỗng, docurl là mảng rỗng
        // upload file dựa vào số phần tử url của plan/regis/claims
        // giả dụ regis có 4 cái phần tử, nếu mà url đó rỗng thì add vào, còn nếu có rồi thì ko update
        // Plan planUpdated = plan.convertUpdToPlan(planUpdateDTO);
        List<String> planUrl = firebaseStorageService.uploadImages(files);
        //planUpdated.setPlanDocuments(documentList);
        Plan savedPlan = planService.updatePlanImagePlanUrl(planId, planUrl);
        PlanUpdateDTO planUpdDTO = savedPlan.convertToPlanUpdateDTO();
        return ResponseEntity.ok(planUpdDTO);
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
}


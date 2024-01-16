package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Contract;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.ClaimService;
import com.example.happylife.backendhappylife.service.ContractService;
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
@RequestMapping("/api/v1/contracts")
public class ContractController {
    @Autowired
    private ContractService contractService;

    //API for Manager
    @PostMapping("/create")
    public ResponseEntity<?> addContract(HttpServletRequest request,
                                                      @RequestBody ContractResDTO contractResDTO) {
        //Contract contract = new Contract();
        //Contract contractUpd = contract.convertResToContract(contractResDTO);
        User userVar = (User) request.getAttribute("userDetails");
        if (userVar.getRole() == Role.INSUARANCE_MANAGER) {
            //Contract savedContract = contractService.updateContractStatus(contractUpd,contractId);
            ContractResDTO contractRes = contractService.addContract(contractResDTO); //savedContract.convertToContractResDTO();
            return ResponseEntity.ok(contractRes);
        } else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    }
    //API for Customer
    @PutMapping("/update/{contractId}/status") //API update status của một contract
    public ResponseEntity<ContractResDTO> updateContract(HttpServletRequest request,
                                                         @PathVariable ObjectId contractId,
                                                         @RequestBody ContractResDTO contractResDTO){
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();
        if(user.getRole() == Role.CUSTOMER){
            return ResponseEntity.ok(contractService.updateContractStatus(contractResDTO,contractId, user));
        }
        return null;
    }
    @GetMapping("/{userId}") //API get toàn bộ contract theo userId
    public ResponseEntity<?> getByUserId(HttpServletRequest request,
                                         @PathVariable ObjectId userId){
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if(user.getRole() == Role.CUSTOMER ||
                user.getRole() == Role.INSUARANCE_MANAGER ||
                user.getRole() == Role.ACCOUNTANT)
        {
            return ResponseEntity.ok(contractService.getContractByUserId(userId,userResDTO));
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    }
}

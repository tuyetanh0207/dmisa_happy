package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceUpdateDTO;
import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.InvoiceService;
import com.example.happylife.backendhappylife.service.PlanService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})

@RestController
@RequestMapping("/api/v1/invoices")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    //API for Customer
    @GetMapping("/{userId}") //API get toàn bộ một invoice theo userId
    public ResponseEntity<?> getByUserId(HttpServletRequest request,
                                         @PathVariable ObjectId userId){
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if(user.getRole() == Role.CUSTOMER ||
                user.getRole() == Role.INSUARANCE_MANAGER ||
                user.getRole() == Role.ACCOUNTANT)
        {
            return ResponseEntity.ok(invoiceService.getInvoiceofUserById(userResDTO,userId));
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    }
    @PutMapping("/{invoiceId}/Cash")
    public ResponseEntity<?> updateInvoice(HttpServletRequest request,
                                           @PathVariable ObjectId invoiceId,
                                           @RequestBody InvoiceUpdateDTO invoiceUpdateDTO) {
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();
        if(user.getRole() == Role.CUSTOMER) {
           return ResponseEntity.ok(invoiceService.updateInvoice(user,invoiceId,invoiceUpdateDTO));
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    };
        @GetMapping("/{regisId}/getByRegisId") //API get 1 regis của một user thông qua regisId
    public ResponseEntity<?> getByRegisId(HttpServletRequest request,
                                          @PathVariable ObjectId regisId){
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if(user.getRole() == Role.CUSTOMER ||
                user.getRole() == Role.INSUARANCE_MANAGER ||
                user.getRole() == Role.ACCOUNTANT)
        {
            return ResponseEntity.ok(invoiceService.getInvoiceByRegisId(userResDTO,regisId));
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    }
}

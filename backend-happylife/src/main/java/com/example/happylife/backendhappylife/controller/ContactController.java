package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.Contact.ContactCreateDTO;
import com.example.happylife.backendhappylife.DTO.Contact.ContactResDTO;
import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Contact;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.ContactService;
import com.example.happylife.backendhappylife.service.ContractService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})

@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {
    @Autowired
    private ContactService contactService;

    //API for Manager
    @GetMapping("")
    public ResponseEntity<?> getContact(HttpServletRequest request) {
        User user = (User) request.getAttribute("userDetails");
        UserResDTO userResDTO = user.convertFromUserToUserResDTO();
        if(userResDTO.getRole() == Role.INSUARANCE_MANAGER) {
            return ResponseEntity.ok(contactService.getListContact());
        }
        else {
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body("You need authenticated account to access this info.");
        }
    };

    //API for Customer
    @PostMapping("/create") //API tạo mới một contact
    public ResponseEntity<?> addContact(@RequestBody ContactCreateDTO contactCreateDTO) {
        ContactResDTO savedContact = contactService.addContact(contactCreateDTO);
        return ResponseEntity.ok(savedContact);
    };

}

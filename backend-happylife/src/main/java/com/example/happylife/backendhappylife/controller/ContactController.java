package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.Contact.ContactCreateDTO;
import com.example.happylife.backendhappylife.DTO.Contact.ContactResDTO;
import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Contact;
import com.example.happylife.backendhappylife.service.ContactService;
import com.example.happylife.backendhappylife.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})

@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {
    @Autowired
    private ContactService contactService;
    @PostMapping("/create") //API tạo mới một contact
    public ResponseEntity<?> addContact(@RequestBody ContactCreateDTO contactCreateDTO) {
        ContactResDTO savedContact = contactService.addContract(contactCreateDTO);
        return ResponseEntity.ok(savedContact);
    };

}

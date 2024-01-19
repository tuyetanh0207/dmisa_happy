package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.Contact.ContactCreateDTO;
import com.example.happylife.backendhappylife.DTO.Contact.ContactResDTO;

public interface ContactService {
    ContactResDTO addContract(ContactCreateDTO contactCreateDTO);
}

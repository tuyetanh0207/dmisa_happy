package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.Contact.ContactCreateDTO;
import com.example.happylife.backendhappylife.DTO.Contact.ContactResDTO;

import java.util.List;

public interface ContactService {
    List<ContactResDTO> getListContact();

    ContactResDTO addContact(ContactCreateDTO contactCreateDTO);
}

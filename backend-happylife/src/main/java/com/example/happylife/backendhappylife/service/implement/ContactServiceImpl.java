package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.Contact.ContactCreateDTO;
import com.example.happylife.backendhappylife.DTO.Contact.ContactResDTO;
import com.example.happylife.backendhappylife.entity.Contact;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.ContactRepo;
import com.example.happylife.backendhappylife.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    private ContactRepo contactRepo;

    @Override
    public ContactResDTO addContract(ContactCreateDTO contactCreateDTO){
        Contact contact = new Contact().convertCreToContact(contactCreateDTO);
        try {
            if (contact.getEmail() == null && contact.getPhoneNumber() == null) {
                throw new UserCreationException("At least have one Email or PhoneNumber");
            }
            if(contact.getMessage() == null) {
                throw new UserCreationException("Message is required");
            }
            if(contact.getServiceType() == null){
                throw new UserCreationException("ServiceType is required");
            }
            if(contact.getCustomerName() == null){
                throw new UserCreationException("Customer name is required");
            }
            Instant instantNow = Instant.now();
            contact.setCreatedAt(instantNow);
            contact.setUpdatedAt(instantNow);
            return contactRepo.save(contact).convertToContactResDTO();
        } catch (Exception e) {
            throw new UserCreationException("Error creating new Contract: " + e.getMessage());
        }
    }
}

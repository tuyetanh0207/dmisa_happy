package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.Contact.ContactCreateDTO;
import com.example.happylife.backendhappylife.DTO.Contact.ContactResDTO;
import com.example.happylife.backendhappylife.entity.Contact;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.ContactRepo;
import com.example.happylife.backendhappylife.service.ContactService;
import com.example.happylife.backendhappylife.service.MyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    private ContactRepo contactRepo;

    @Override
    public List<ContactResDTO> getListContact(){
        try{
            List<Contact> contactList = contactRepo.findAll();
            List<ContactResDTO> contactResDTOList = contactList.stream()
                    .map(Contact::convertToContactResDTO)
                    .collect(Collectors.toList());
            return  contactResDTOList;
        } catch (Exception e){
            throw new UserCreationException("Error geting contact:" + e.getMessage());
        }
    }
    @Override
    public ContactResDTO addContact(ContactCreateDTO contactCreateDTO){
        Contact contact = new Contact().convertCreToContact(contactCreateDTO);
        try {
            if (contact.getEmail().isEmpty() && contact.getPhoneNumber().isEmpty()) {
                throw new UserCreationException("At least have one Email or PhoneNumber");
            }
            if (!MyService.isValidEmail(contact.getEmail()) && contact.getEmail().isEmpty()) {
                throw new UserCreationException("Email is invalid");
            }
            if (!MyService.isValidPhoneNumber(contact.getPhoneNumber()) && contact.getPhoneNumber().isEmpty()) {
                throw new UserCreationException("Phone number is invalid");
            }
            if(contact.getMessage().isEmpty()) {
                throw new UserCreationException("Message is required");
            }
            if(contact.getServiceType().isEmpty()){
                throw new UserCreationException("ServiceType is required");
            }
            if(contact.getCustomerName().isEmpty()){
                throw new UserCreationException("Customer name is required");
            }
            if(!MyService.isValidEmail(contact.getEmail())){
                throw new UserCreationException("Email must have right format");
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

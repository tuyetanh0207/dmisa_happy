package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.Contact.ContactCreateDTO;
import com.example.happylife.backendhappylife.DTO.Contact.ContactResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Contact")
public class Contact {
    @Id
    private ObjectId contactId;
    @Column(nullable = false)
    private String customerName;

    private String phoneNumber;
    private String email;

    @Column(nullable = false)
    private String serviceType;
    @Column(nullable = false)
    private String message;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant createdAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant updatedAt;

    public Contact convertResToContact(ContactResDTO dto) {
        Contact Contact = new Contact();
        if(dto.getContactId() != null){
            ObjectId dtoId = new ObjectId(dto.getContactId());
            Contact.setContactId(dtoId);
        }
        Contact.setEmail(dto.getEmail());
        Contact.setUpdatedAt(dto.getUpdatedAt());
        Contact.setCreatedAt(dto.getCreatedAt());
        Contact.setServiceType(dto.getServiceType());
        Contact.setMessage(dto.getMessage());
        Contact.setCustomerName(dto.getCustomerName());
        Contact.setPhoneNumber(dto.getPhoneNumber());
        return Contact;
    }
    public ContactResDTO convertToContactResDTO() {
        ContactResDTO dto = new ContactResDTO();
        dto.setContactId(this.contactId.toString());
        dto.setCustomerName(this.customerName);
        dto.setMessage(this.message);
        dto.setEmail(this.email);
        dto.setCreatedAt(this.createdAt);
        dto.setPhoneNumber(this.phoneNumber);
        dto.setServiceType(this.serviceType);
        dto.setUpdatedAt(this.updatedAt);
        return dto;
    }

    public Contact convertCreToContact(ContactCreateDTO dto) {
        Contact Contact = new Contact();
        Contact.setEmail(dto.getEmail());
        Contact.setServiceType(dto.getServiceType());
        Contact.setMessage(dto.getMessage());
        Contact.setCustomerName(dto.getCustomerName());
        Contact.setPhoneNumber(dto.getPhoneNumber());
        return Contact;
    }
    public ContactCreateDTO convertToContactCreDTO() {
        ContactCreateDTO dto = new ContactCreateDTO();
        dto.setCustomerName(this.customerName);
        dto.setMessage(this.message);
        dto.setEmail(this.email);
        dto.setPhoneNumber(this.phoneNumber);
        dto.setServiceType(this.serviceType);
        return dto;
    }
}

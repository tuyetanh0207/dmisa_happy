package com.example.happylife.backendhappylife.DTO.Contact;

import jakarta.persistence.Column;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;

@Getter
public class ContactResDTO {
    private String contactId;
    private String customerName;
    private String phoneNumber;
    private String email;
    private String serviceType;
    private String message;
    private Instant createdAt;
    private Instant updatedAt;

    public void setContactId(String contactId) {
        this.contactId = contactId;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}

package com.example.happylife.backendhappylife.DTO.Contact;

import lombok.Getter;

import java.time.Instant;

@Getter
public class ContactCreateDTO {
    private String customerName;
    private String phoneNumber;
    private String email;
    private String serviceType;
    private String message;

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
}

package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.InvoiceRepo;
import com.example.happylife.backendhappylife.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class InvoiceServiceImpl implements InvoiceService {
    @Autowired
    private InvoiceRepo invoiceRepo;

    @Override
    public Invoice addInvoice(Invoice invoice){
        if (invoice.getRegisInfo() == null) {
            throw new UserCreationException("Regis information is required.");
        }
        if (invoice.getPaymentStatus() != "Pending") {
            throw new UserCreationException("New invoice's status must be Pending.");
        }
        if (invoice.getDueDate() == null) {
            throw new UserCreationException("Due date is required.");
        }
        if (invoice.getPaymentMethod() != null) {
            throw new UserCreationException("New invoice's payment method is not required.");
        }
        if (invoice.getTotalPrice() == null) {
            throw new UserCreationException("Price is required.");
        }
        try {
            Instant instantNow = Instant.now();
            invoice.setCreatedAt(instantNow);
            invoice.setUpdatedAt(instantNow);
            return invoiceRepo.save(invoice);
        } catch (Exception e) {
            throw new UserCreationException("Error creating new Plan: " + e.getMessage());
        }
    }
}

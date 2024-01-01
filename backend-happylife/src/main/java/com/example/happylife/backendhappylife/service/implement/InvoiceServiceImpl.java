package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.InvoiceRepo;
import com.example.happylife.backendhappylife.service.InvoiceService;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

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
    @Override
    public Invoice updateInvoice(UserResDTO authUser, ObjectId invoiceId, Invoice invoice){
        try {
            if (authUser.getRole() == Role.CUSTOMER) {
                if (invoice.getRegisInfo().getApprovalStatus().equals("Approved") ||
                    invoice.getPaymentMethod() != null){
                    Invoice invoiceVar = invoiceRepo.findById(invoiceId)
                            .orElseThrow(() -> new EntityNotFoundException("Invoice not found with id: " + invoiceId));
                    Instant instantNow = Instant.now();
                    invoiceVar.setUpdatedAt(instantNow);
                    invoiceVar.setPaymentStatus("Paid");
                    invoiceVar.setPaymentMethod(invoice.getPaymentMethod());
                    invoiceRepo.save(invoiceVar);
                    return invoiceVar;
                } else{
                    throw  new UserCreationException("Error updating invoice : your regis is not Approved or you didn't choose payment method");
                }

            } else {
                throw  new UserCreationException("Error updating invoice, you need an authenticated account to do this action.");
            }
        } catch (Exception e){
            throw  new UserCreationException("Error updating invoice: "+ e.getMessage());
        }
    }
}

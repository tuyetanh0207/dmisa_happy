package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanInvoiceDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.repo.RegistrationRepo;
import com.example.happylife.backendhappylife.service.InvoiceService;
import com.example.happylife.backendhappylife.service.RegistrationService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

import com.example.happylife.backendhappylife.exception.UserCreationException;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class RegistrationImpl implements RegistrationService {
    @Autowired
    private RegistrationRepo registrationRepo;

    @Autowired
    private InvoiceService invoiceService;

    @Override
    public List<Registration> getRegistrations(UserResDTO user) {
        try {
            if (user.getRole()== Role.INSUARANCE_MANAGER|| user.getRole() == Role.ACCOUNTANT ){
                List<Registration> registrations = registrationRepo.findAll();
                return registrations;
            } else {
                throw new UserCreationException("You need authenticated account to access this infomation.");
            }
        }
        catch (Exception e) {
            throw new UserCreationException("Error getting registrations: " + e.getMessage());
        }

    }

    @Override
    public Registration addRegistration(UserResDTO authUser, UserResDTO registerUser, PlanInvoiceDTO plan) {
        if (registerUser.getId() == null || registerUser.getId().isEmpty()){
            throw new UserCreationException("User ID is required.");
        }
        if (plan.getPlanId()==null){
            throw new UserCreationException("Plan ID is required.");
        }
        try {
            Instant instantNow= Instant.now();
            Registration regisCreateDTO = new Registration();
            regisCreateDTO.setCustomerInfo(registerUser);
            regisCreateDTO.setProductInfo(plan);
            regisCreateDTO.setPrice(plan.getPlanPrice());
            regisCreateDTO.setApprovalStatus("Pending");
            regisCreateDTO.setCreatedAt(instantNow);
            regisCreateDTO.setUpdatedAt(instantNow);
            return registrationRepo.save(regisCreateDTO);

        }
        catch (Exception e) {
            throw new UserCreationException("Error creating registration: " + e.getMessage());
        }
    }


    @Override
    public Registration updateRegisStatus(UserResDTO authUser, ObjectId regisId, String status, String message) {
        try {
            if (authUser.getRole() == Role.INSUARANCE_MANAGER || authUser.getRole() == Role.ACCOUNTANT ) {
                if (status.equals("Approved") || status.equals("Rejected") || status.equals("Expired") || status.equals("Revoked") || status.equals("Pending")){
                    Registration regisVar = registrationRepo.findById(regisId).get();
                    regisVar.setApprovalStatus(status);
                    regisVar.setMessage(message);
                    if (status.equals("Approved")) {
                        // Tạo InvoiceCreateDTO và gọi phương thức tạo hóa đơn
                        InvoiceCreateDTO invoiceCreateDTO = new InvoiceCreateDTO();
                        invoiceCreateDTO.setRegisInfo(regisVar.convertToRegisResDTO());
                        invoiceCreateDTO.setTotalPrice(regisVar.getProductInfo().getPlanPrice());

                        Instant instantNow= Instant.now();

                        Instant dueDateInstant = regisVar.getEndDate().plus(10, ChronoUnit.DAYS);
                        invoiceCreateDTO.setDueDate(dueDateInstant);
                        invoiceCreateDTO.setPaymentStatus("Pending");
                        Invoice invoice = new Invoice();
                        Invoice invoiceCreated = invoice.convertCreToInvoice(invoiceCreateDTO);
                        invoiceService.addInvoice(invoiceCreated);
                    }
                    return registrationRepo.save(regisVar);
                } else{
                    throw  new UserCreationException("Error updating status of registration: status is invalid.");
                }

            } else {
                throw  new UserCreationException("Error updating status of registration, you need an authenticated account to do this action.");
            }
        } catch (Exception e){
            throw  new UserCreationException("Error updating status of registration: "+ e.getMessage());
        }
    }
}

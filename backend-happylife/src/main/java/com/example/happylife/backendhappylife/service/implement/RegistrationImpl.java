package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.DateUnit;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.repo.RegistrationRepo;
import com.example.happylife.backendhappylife.service.InvoiceService;
import com.example.happylife.backendhappylife.service.RegistrationService;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

import com.example.happylife.backendhappylife.exception.UserCreationException;

import java.time.ZoneId;
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
    public Registration addRegistration(UserResDTO authUser, Registration regis) {
        if (regis.getCustomerInfo().getId() == null || regis.getCustomerInfo().getId().isEmpty()){
            throw new UserCreationException("User ID is required.");
        }
        if (regis.getProductInfo().getPlanId()==null){
            throw new UserCreationException("Plan ID is required.");
        }
        try {

            Instant instantNow= Instant.now();
            regis.setPrice(regis.getProductInfo().getPlanPrice());
            regis.setApprovalStatus("Pending");
            regis.setCreatedAt(instantNow);
            regis.setUpdatedAt(instantNow);

            Instant startDate = instantNow.plus(Duration.ofDays(30));
            Instant endDate = startDate ;
            if (regis.getProductInfo().getPlanDurationUnit().equals(DateUnit.Day)){
                endDate = startDate.plus(Duration.ofDays(regis.getProductInfo().getPlanDuration()));
            }
            if (regis.getProductInfo().getPlanDurationUnit().equals(DateUnit.Month)){
                long months = regis.getProductInfo().getPlanDuration();
                endDate = startDate.atZone(ZoneId.systemDefault()).plusMonths(months).toInstant();
            }
            if (regis.getProductInfo().getPlanDurationUnit().equals(DateUnit.Year)){
                long years= regis.getProductInfo().getPlanDuration();
                endDate = startDate.atZone(ZoneId.systemDefault()).plusYears(years).toInstant();
            }
            regis.setStartDate(startDate);
            regis.setEndDate(endDate);
            return registrationRepo.save(regis);

        }
        catch (Exception e) {
            throw new UserCreationException("Error creating registration: " + e.getMessage());
        }
    }
    @Override
    public Registration updateRegisStatus(UserResDTO authUser, ObjectId regisId, Registration regis) {
        try {
            if (authUser.getRole() == Role.INSUARANCE_MANAGER || authUser.getRole() == Role.ACCOUNTANT ) {
                if (regis.getApprovalStatus().equals("Approved") || regis.getApprovalStatus().equals("Rejected") ||
                        regis.getApprovalStatus().equals("Expired") || regis.getApprovalStatus().equals("Revoked") ||
                        regis.getApprovalStatus().equals("Pending")){
                    Registration regisVar = registrationRepo.findById(regisId)
                            .orElseThrow(() -> new EntityNotFoundException("Regis not found with id: " + regisId));
                    regisVar.setApprovalStatus(regis.getApprovalStatus());
                    regisVar.setMessage(regis.getMessage());
                    if (regis.getApprovalStatus().equals("Approved")) {
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

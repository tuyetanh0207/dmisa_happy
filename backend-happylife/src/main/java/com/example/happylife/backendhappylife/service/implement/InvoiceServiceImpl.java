package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.RegistrationEventEnum;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.InvoiceRepo;
import com.example.happylife.backendhappylife.service.InvoiceService;
import com.example.happylife.backendhappylife.service.handlerEvent.classEvent.RegistrationEvent;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {
    @Autowired
    private InvoiceRepo invoiceRepo;

    //Xử lí các event gọi các service khác
    @Autowired
    private ApplicationEventPublisher publisher;

    @Override // Sửa lại do event call bên regis của manager
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

    //Service for Customer
    @Override
    public  List<InvoiceResDTO> getInvoiceofUserById(UserResDTO userVar, ObjectId userId){
        try{
            User user = new User().convertResToUser(userVar);
            if(user.getId().equals(userId)) {
                List<Invoice> invoices = invoiceRepo.findByRegisInfo_CustomerInfo_Id(userId.toString());
                List<InvoiceResDTO> invoiceResDTOList = invoices.stream()
                        .map(invoice -> invoice.convertToInvoiceResDTO())
                        .collect(Collectors.toList());
                return invoiceResDTOList;
            }
            else if(user.getRole() == Role.INSUARANCE_MANAGER){
                List<Invoice> invoices = invoiceRepo.findByRegisInfo_CustomerInfo_Id(userId.toString());
                List<InvoiceResDTO> invoiceResDTOList = invoices.stream()
                        .map(invoice -> invoice.convertToInvoiceResDTO())
                        .collect(Collectors.toList());
                return invoiceResDTOList;
            }
        } catch (Exception e) {
            throw new UserCreationException("Error getting user's regis: " + e.getMessage());
        }
        return null;
    }
    @Override
    public InvoiceResDTO getInvoiceByRegisId(UserResDTO userVar, ObjectId regisId){
        try{
            User user = new User().convertResToUser(userVar);
            Invoice existingInvoice = invoiceRepo.findByRegisInfo_RegisId(regisId.toString())
                    .orElseThrow(() -> new EntityNotFoundException("Regis not found with id: " + regisId));
            if(existingInvoice.getRegisInfo().getCustomerInfo().getId().equals(user.getId().toString())){
                return existingInvoice.convertToInvoiceResDTO();
            }
            else if(user.getRole() == Role.ACCOUNTANT || user.getRole() == Role.INSUARANCE_MANAGER){
                return existingInvoice.convertToInvoiceResDTO();
            }
            return null;
        } catch (Exception e){
            throw  new UserCreationException("Error get registration: "+ e.getMessage());
        }
    }
    @Override
    public InvoiceUpdateDTO updateInvoice(UserResDTO user, ObjectId invoiceId, InvoiceUpdateDTO invoiceUpd){
        Invoice invoice = new Invoice().convertUpdToInvoice(invoiceUpd);
        User authUser = new User().convertResToUser(user);
        try {
                if ("Signed".equals(invoice.getRegisInfo().getApprovalStatus().trim()) &&
                    invoice.getPaymentMethod() != null &&
                    invoice.getRegisInfo().getRegisId().isEmpty() == false &&
                    "Pending".equals(invoice.getPaymentStatus().trim())){

                    Invoice existingInvoice = invoiceRepo.findById(invoiceId)
                            .orElseThrow(() -> new EntityNotFoundException("Invoice not found with id: " + invoiceId));
                    if(user.getId() == existingInvoice.getInvoiceId().toString()){
                        Instant instantNow = Instant.now();
                        existingInvoice.setUpdatedAt(instantNow);
                        existingInvoice.setPaymentStatus("Paid");
                        existingInvoice.setPaymentMethod(invoice.getPaymentMethod());
                        invoiceRepo.save(existingInvoice);

                        ObjectId regisId = new ObjectId();
                        if(invoice.getRegisInfo().getRegisId() != null){
                            regisId = new ObjectId(invoice.getRegisInfo().getRegisId());
                        }
                        RegisResDTO regis = existingInvoice.getRegisInfo();
                        regis.setRegisId(regisId.toString());
                        regis.setApprovalStatus("Paid");
                        Registration regisUpd = new Registration().convertToRegis(regis);
                        RegistrationEventEnum method = RegistrationEventEnum.updateStatus;
                        publisher.publishEvent(new RegistrationEvent(regisUpd, method));

                        return existingInvoice.convertToInvoiceUpdateDTO();

                    }
                    else {
                        throw new UserCreationException("Error updating invoice : you don't have permission");
                    }
                } else{
                    throw  new UserCreationException("Error updating invoice : your regis is not Approved or you didn't choose payment method");
                }
        } catch (Exception e){
            throw  new UserCreationException("Error updating invoice: "+ e.getMessage());
        }
    }
}

package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.InvoiceType;
import com.example.happylife.backendhappylife.entity.Enum.RegistrationEventEnum;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Notification;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.InvoiceRepo;
import com.example.happylife.backendhappylife.service.InvoiceService;
import com.example.happylife.backendhappylife.service.handlerEvent.classEvent.NotificationEvent;
import com.example.happylife.backendhappylife.service.handlerEvent.classEvent.RegistrationEvent;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
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
    public InvoiceResDTO addInvoice(InvoiceCreateDTO invoice){
        Invoice newInvoice = new Invoice();
        if(invoice.getInvoiceType()==null) {
            throw new UserCreationException("Type of invoice is required.");
        } else if (invoice.getInvoiceType().equals(InvoiceType.Registration_Payment)){
            if (invoice.getRegisInfo() == null) {
                throw new UserCreationException("Registration information is required.");
            }
        } else if (invoice.getInvoiceType().equals(InvoiceType.Claim_Payment)){
            if (invoice.getClaimInfo() == null) {
                throw new UserCreationException("Claim information is required.");
            }
        } else {
            throw new UserCreationException("Type of invoice is invalid.");
        }

        if (invoice.getPaymentStatus() != "Pending") {
            throw new UserCreationException("New invoice's status must be Pending.");
        }

        if (invoice.getTotalPrice() == null) {
            throw new UserCreationException("Price is required.");
        }
        try {
            newInvoice=newInvoice.convertCreToInvoice(invoice);
            Instant instantNow = Instant.now();
            newInvoice.setCreatedAt(instantNow);
            newInvoice.setUpdatedAt(instantNow);
            Invoice savedInvoice = invoiceRepo.save(newInvoice);
            return savedInvoice.convertToInvoiceResDTO();
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
            if (!invoice.getRegisInfo().getApprovalStatus().equals("Signed")){
                System.out.println("Error True Signed");
                throw new UserCreationException("Error updating invoice : regis status must be Signed");
            }
            if (invoice.getPaymentMethod() == null){
                throw new UserCreationException("Error updating invoice : payment status must be not null");
            }
            if (invoice.getRegisInfo().getRegisId().isEmpty() == true){
                throw new UserCreationException("Error updating invoice : regis id must be not null");
            }
            if (!"Pending".equals(invoice.getPaymentStatus().trim())){
                throw new UserCreationException("Error updating invoice : payment status must be Pending");
            }
            Invoice existingInvoice = invoiceRepo.findById(invoiceId)
                    .orElseThrow(() -> new EntityNotFoundException("Invoice not found with id: " + invoiceId));
            if(authUser.getId().toString().equals(existingInvoice.getRegisInfo().getCustomerInfo().getId())){
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
                Message mes = new Message();
                mes.setContent("You have pay the invoice successfully!");
                mes.setDateMessage(instantNow);
                List<Message> messageList = new ArrayList<>();
                messageList.add(mes);
                regis.setMessage(messageList);

             /*   if(regis.getMessage() == null) {regis.setMessage(new ArrayList<>());};
                regis.getMessage().add(mes);*/
                Registration regisUpd = new Registration().convertToRegis(regis);
                RegistrationEventEnum method = RegistrationEventEnum.updateStatus;
                publisher.publishEvent(new RegistrationEvent(regisUpd, method));

                Notification noti = new Notification();
                noti.setNotiTitle("Thông báo đã thanh toán thành công!");
                noti.setNotiContent("You have pay the invoice successfully!");
                noti.setUserInfo(authUser.getId());
                publisher.publishEvent(new NotificationEvent(noti));

                return existingInvoice.convertToInvoiceUpdateDTO();
            } else{
                throw  new UserCreationException("Error updating invoice : user don't have permission");
            }
        } catch (Exception e){
            throw  new UserCreationException("Error updating invoice: "+ e.getMessage());
        }
    }
}

package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisUpdateStatusDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.DateUnit;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.repo.RegistrationRepo;
import com.example.happylife.backendhappylife.service.RegistrationService;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

import com.example.happylife.backendhappylife.exception.UserCreationException;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistrationImpl implements RegistrationService {
    @Autowired
    private RegistrationRepo registrationRepo;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Override
    public List<Registration> getRegistrations(UserResDTO user) {
        try {
            if (user.getRole()== Role.INSUARANCE_MANAGER|| user.getRole() == Role.ACCOUNTANT ){
                List<Registration> registrations = registrationRepo.findAll();
                return registrations;
            }
            else {
                throw new UserCreationException("You need authenticated account to access this infomation.");
            }
        }
        catch (Exception e) {
            throw new UserCreationException("Error getting registrations: " + e.getMessage());
        }
    }

    @Override
    public Registration updateRegisStatus(UserResDTO authUser, ObjectId regisId, RegisUpdateStatusDTO regisUpdateStatusDTO) {
        try {
            //thêm một dòng để convert DTO sang entity
            RegisResDTO regis = regisUpdateStatusDTO.getRegis();
            Message msg = regisUpdateStatusDTO.getMessage();
            Instant instantNow = Instant.now();
            if (authUser.getRole() == Role.INSUARANCE_MANAGER || authUser.getRole() == Role.ACCOUNTANT ) {
                if (regis.getApprovalStatus().equals("Approved") || regis.getApprovalStatus().equals("Rejected") ||
                        regis.getApprovalStatus().equals("Expired") || regis.getApprovalStatus().equals("Revoked") ||
                        regis.getApprovalStatus().equals("Pending")){
                    Registration regisVar = registrationRepo.findById(regisId)
                            .orElseThrow(() -> new EntityNotFoundException("Regis not found with id: " + regisId));
                    regisVar.setApprovalStatus(regis.getApprovalStatus());
                    msg.setDateMessage(instantNow);
                    if(regisVar.getMessage()!=null){
                        List<Message> msgList = regisVar.getMessage();
                        msgList.add(msg);
                        regisVar.setMessage(msgList);
                    } else{

                        regisVar.setMessage(Arrays.asList(msg));
                    }
                    if (regis.getApprovalStatus().equals("Approved")) {
                        //Tạo InvoiceCreateDTO và gọi phương thức tạo hóa đơn
                       /* InvoiceCreateDTO invoiceCreateDTO = new InvoiceCreateDTO();
                        invoiceCreateDTO.setRegisInfo(regisVar.convertToRegisResDTO());
                        invoiceCreateDTO.setTotalPrice(regisVar.getInsuranceAmount());
                        Instant dueDateInstant = regisVar.getEndDate().plus(10, ChronoUnit.DAYS);
                        invoiceCreateDTO.setDueDate(dueDateInstant);
                        invoiceCreateDTO.setPaymentStatus("Pending");
                        Invoice invoice = new Invoice();
                        Invoice invoiceCreated = invoice.convertCreToInvoice(invoiceCreateDTO);
                        invoiceService.addInvoice(invoiceCreated);

                        //Tạo Contract
                        Contract contract = new Contract();
                        contract.setConfirmation(false);
                        contract.setRegisInfo(regis);
                        contract.setStatus("Waiting");
                        //contractService.addContract(contract);
                        publisher.publishEvent(new ContractCreatedEvent(contract));*/
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

    @Override
    public List<RegisResDTO> getEnrollOfPlan(UserResDTO authUser, ObjectId planId, String status) {
        PlanResDTO plan = new PlanResDTO();
        plan.setPlanId(planId.toString());
        List<Registration> regiss =registrationRepo.findAllByProductInfoAndApprovalStatus(plan.getPlanId(), status);

        System.out.println("size regis");
        System.out.println(regiss.size());
        List<RegisResDTO> registrations = regiss.stream().
                map(regis -> regis.convertToRegisResDTO())
                .collect(Collectors.toList());

        return registrations;
    }


    //Service for Customer
    @Override
    public RegisResDTO getRegisByIdRegis(UserResDTO userVar, ObjectId regisId){
        try{
            User user = new User().convertResToUser(userVar);
            Registration existingRegis = registrationRepo.findById(regisId)
                    .orElseThrow(() -> new EntityNotFoundException("Regis not found with id: " + regisId));
            if(existingRegis.getCustomerInfo().getId().equals(user.getId().toString())){
                return existingRegis.convertToRegisResDTO();
            }
            else if(user.getRole() == Role.ACCOUNTANT || user.getRole() == Role.INSUARANCE_MANAGER){
                return existingRegis.convertToRegisResDTO();
            }
            return null;
        } catch (Exception e){
        throw  new UserCreationException("Error get registration: "+ e.getMessage());
        }
    }
    @Override
    public RegisResDTO getRegisByIdRegisForEvent(ObjectId regisId){
        try{
            Registration existingRegis = registrationRepo.findById(regisId)
                    .orElseThrow(() -> new EntityNotFoundException("Regis not found with id: " + regisId));
            return existingRegis.convertToRegisResDTO();

        } catch (Exception e){
            throw  new UserCreationException("Error get registration: "+ e.getMessage());
        }
    }
    @Override //Event được call khi người dùng kí hợp đồng, thanh toán invoice
    public RegisResDTO updateRegisStatusOfCustomer(ObjectId regisId, RegisUpdateDTO regisUpdateDTO){
        try {
            Registration updRegis = new Registration().convertUpdToRegistrations(regisUpdateDTO);
            Registration existingRegis = registrationRepo.findById(regisId)
                    .orElseThrow(() -> new EntityNotFoundException("Regis not found with id: " + regisId));
            existingRegis.setApprovalStatus(updRegis.getApprovalStatus());
            registrationRepo.save(existingRegis);
            return existingRegis.convertToRegisResDTO();
        } catch (Exception e){
            throw  new UserCreationException("Error updating status of registration: "+ e.getMessage());
        }
    }
    @Override
    public RegisCreateDTO addRegistration(RegisCreateDTO regisCreateDTO) {
        Registration regis = new Registration().convertCreToRegistrations(regisCreateDTO);
        try {
            if (regis.getCustomerInfo().getId() == null || regis.getCustomerInfo().getId().isEmpty()){
                throw new UserCreationException("User ID is required.");
            }
            if (regis.getProductInfo().getPlanId()==null){
                throw new UserCreationException("Plan ID is required.");
            }

            Instant instantNow= Instant.now();
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
            registrationRepo.save(regis);
            return regis.convertToRegisCreateDTO();
        }
        catch (Exception e) {
            throw new UserCreationException("Error creating registration: " + e.getMessage());
        }
    }
    @Override
    public List<RegisResDTO> getRegisByUserId(UserResDTO userVar, ObjectId userId) {
        User user = new User().convertResToUser(userVar);
        try{
            if(user.getId().toString().equals(userId.toString())) {
                List<Registration> regisList = registrationRepo.findByCustomerInfo_Id(userId.toString());
                List<RegisResDTO> regisResDTOList = regisList.stream()
                        .map(registration -> registration.convertToRegisResDTO())
                        .collect(Collectors.toList());
                return regisResDTOList;
            }
            else if(user.getRole() == Role.INSUARANCE_MANAGER){
                List<Registration> regisList = registrationRepo.findByCustomerInfo_Id(userId.toString());
                List<RegisResDTO> regisResDTOList = regisList.stream()
                        .map(registration -> registration.convertToRegisResDTO())
                        .collect(Collectors.toList());
                return regisResDTOList;
            }
        } catch (Exception e) {
            throw new UserCreationException("Error getting user's regis: " + e.getMessage());
        }
        return null;
    }

    //Service for upload file, image
    @Override
    public RegisResDTO updateRegisImageDocUrl(ObjectId regisId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts) {
        Registration existingRegis = registrationRepo.findById(regisId)
                .orElseThrow(() -> new EntityNotFoundException("Regis not found with id: " + regisId));
        try {
            Iterator<String> urlIterator = uploadedUrls.iterator();
            List<Registration.documentRegiss> documentList = new ArrayList<>();

            for (SectionFileCount fileCount : sectionFileCounts) {
                Registration.documentRegiss document = new Registration.documentRegiss();
                List<String> docUrls = new ArrayList<>();
                for (int i = 0; i < fileCount.getFileCount(); i++) {
                    if (urlIterator.hasNext()) {
                        docUrls.add(urlIterator.next());
                    }
                }
                document.setDocCategory(fileCount.getSection().trim());
                //System.out.println("Value : " + fileCount.getSection().trim());
                document.setUrls(docUrls);
                documentList.add(document);
            }
            existingRegis.setDocumentUrls(documentList);
            Registration updatedRegis = registrationRepo.save(existingRegis);
            RegisResDTO regisResDTO = updatedRegis.convertToRegisResDTO();
            return regisResDTO;
        } catch (Exception e) {
            throw new UserCreationException("Error update Regis: " + e.getMessage());
        }
    }
    @Override
    public RegisResDTO updateRegisFileDocUrl(ObjectId regisId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts) {
        Registration existingRegis = registrationRepo.findById(regisId)
                .orElseThrow(() -> new EntityNotFoundException("Regis not found with id: " + regisId));
        try {
            Iterator<String> urlIterator = uploadedUrls.iterator();
            List<Registration.documentRegiss> documentList = new ArrayList<>();

            for (SectionFileCount fileCount : sectionFileCounts) {
                Registration.documentRegiss document = new Registration.documentRegiss();
                List<String> docUrls = new ArrayList<>();
                for (int i = 0; i < fileCount.getFileCount(); i++) {
                    if (urlIterator.hasNext()) {
                        docUrls.add(urlIterator.next());
                    }
                }
                document.setDocCategory(fileCount.getSection().trim());
                //System.out.println("Value : " + fileCount.getSection().trim());
                document.setUrls(docUrls);
                documentList.add(document);
            }
            existingRegis.setDocumentUrls(documentList);
            Registration updatedRegis = registrationRepo.save(existingRegis);
            RegisResDTO regisResDTO = updatedRegis.convertToRegisResDTO();
            return regisResDTO;
        } catch (Exception e) {
            throw new UserCreationException("Error update Regis: " + e.getMessage());
        }
    }
    @Override
    public RegisResDTO getRegisByPlanId(ObjectId planId){
        try {
            Registration existingRegis = registrationRepo.findByProductInfo_PlanId(planId.toString())
                    .orElseThrow(() -> new EntityNotFoundException("Regis not found with id: " + planId));
            return existingRegis.convertToRegisResDTO();
        } catch (Exception e) {
            throw new UserCreationException("Error get Regis: " + e.getMessage());
        }
    }
}

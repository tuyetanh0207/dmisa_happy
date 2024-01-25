package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.CONSTANT;
import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractCreateDTO;
import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationCreateDTO;
import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisUpdateStatusDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Contract;
import com.example.happylife.backendhappylife.entity.Enum.DateUnit;
import com.example.happylife.backendhappylife.entity.Enum.InvoiceType;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.repo.RegistrationRepo;
import com.example.happylife.backendhappylife.service.*;
import com.example.happylife.backendhappylife.service.handlerEvent.classEvent.ContractEvent;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

import com.example.happylife.backendhappylife.exception.UserCreationException;

import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
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

    @Autowired
    private ContractService contractService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private StatistaService statistaService;


    @Override
    public List<RegisResDTO> getRegistrations(UserResDTO user) {
        try {
            if (user.getRole()== Role.INSUARANCE_MANAGER|| user.getRole() == Role.ACCOUNTANT ){
                List<RegisResDTO> registrations = registrationRepo.findAll().stream()
                        .map(regis -> regis.convertToRegisResDTO())
                        .collect(Collectors.toList());
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
    public RegisResDTO updateRegisStatus(UserResDTO authUser, ObjectId regisId, RegisUpdateStatusDTO regisUpdateStatusDTO) {
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

                    NotificationCreateDTO notificationCreateDTO = new NotificationCreateDTO();
                    notificationCreateDTO.setNotiTitle(CONSTANT.NOTIFICATION_TITLES.get(0));
                    notificationCreateDTO.setNotiContent(CONSTANT.REGIS_NOTIFICATION_UPDATE_STATUS);
                    notificationCreateDTO.setNotiType(CONSTANT.NOTIFICATION_TITLES.get(0));
                    notificationCreateDTO.setUserInfo(regisUpdateStatusDTO.getRegis().getCustomerInfo().getId());
                    notificationCreateDTO.setNotiPrio("Normal");

                    if (regis.getApprovalStatus().equals("Approved")) {

                        InvoiceCreateDTO invoiceCreateDTO = new InvoiceCreateDTO();
                        invoiceCreateDTO.setInvoiceType(InvoiceType.Registration_Payment);
                        invoiceCreateDTO.setRegisInfo(regisVar.convertToRegisResDTO());

                        if(regisUpdateStatusDTO.getRegis().getTotalFee()!= null) {
                            invoiceCreateDTO.setTotalPrice(regisUpdateStatusDTO.getRegis().getTotalFee());
                        } else {
                            invoiceCreateDTO.setTotalPrice(0);
                        }

                        Instant dueDateInstant = regisVar.getEndDate().plus(CONSTANT.DUE_DATE_CONTRACT, ChronoUnit.DAYS);
                        invoiceCreateDTO.setDueDate(dueDateInstant);
                        invoiceCreateDTO.setPaymentStatus("Pending");
                        invoiceService.addInvoice(invoiceCreateDTO);

                        ContractCreateDTO contract = new ContractCreateDTO();
                        contract.setConfirmation(false);
                        contract.setRegisInfo(regis);
                        contract.setStatus("Awaiting");
                        ContractResDTO savedContract = contractService.addContract(contract);
                        Contract contractEntity = new Contract();
                        contractEntity = contractEntity.convertResToContract(savedContract);
                        //publisher.publishEvent(new ContractEvent(contractEntity));
                        regisVar.setContractIdInfo(savedContract);
                        notificationCreateDTO.setNotiPrio("High");

                        statistaService.updateStatistaByResolvedRegistration(regisVar.convertToRegisResDTO());


                    }
                    if (regis.getApprovalStatus().equals("Revoked")){

                        ContractResDTO oldContract = contractService.getContractByRegisId(authUser,regisId);
                        oldContract.setStatus(CONSTANT.CONTRACT_STATUS.get(0)); // cancel contract
                        contractService.updateContract(oldContract);
                        regisVar.setContractIdInfo(oldContract);

                        statistaService.updateStatistaByResolvedRegistration(regisVar.convertToRegisResDTO());

                    }
                    notificationService.addAutoNoti(notificationCreateDTO);
                    return registrationRepo.save(regisVar).convertToRegisResDTO();
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
    public List<RegisResDTO> getEnrollOfPlan(UserResDTO authUser, ObjectId planId, List<String> statusList) {
        PlanResDTO plan = new PlanResDTO();
        plan.setPlanId(planId.toString());
        List<Registration> regiss =registrationRepo.findAllByProductInfoAndApprovalStatus(plan.getPlanId(), statusList);
        System.out.println(regiss.size());
        List<RegisResDTO> registrations = regiss.stream().
                map(regis -> regis.convertToRegisResDTO())
                .collect(Collectors.toList());

        return registrations;
    }

    @Override
    public List<RegisResDTO> getAllRegistrationOfOnePlan(UserResDTO authUser, ObjectId planId) {
        PlanResDTO plan = new PlanResDTO();
        plan.setPlanId(planId.toString());
        List<Registration> regiss =registrationRepo.findAllByPlanId(plan.getPlanId());
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
            System.out.println("Try to add mess !!!");
            List<Message> messageList = new ArrayList<>();
            if(existingRegis.getMessage() == null) {
                System.out.println("Try to add all !!!");
                messageList.addAll(updRegis.getMessage());
            }
            else {
                System.out.println("Try to add mess !!!");

                messageList = existingRegis.getMessage();
                messageList.addAll(updRegis.getMessage());
            }
            existingRegis.setMessage(messageList);
            System.out.println("Size of Message : " + existingRegis.getMessage().size());
            System.out.println("Message : " + existingRegis.getMessage());

            Instant instantNow = Instant.now();
            existingRegis.setUpdatedAt(instantNow);
            Registration savedRegis = registrationRepo.save(existingRegis);

            if(savedRegis.getApprovalStatus().equals("Signed")){
                statistaService.updateStatistaByResolvedRegistration(savedRegis.convertToRegisResDTO());
            }

            return savedRegis.convertToRegisResDTO();
        } catch (Exception e){
            throw  new UserCreationException("Error updating status of registration: "+ e.getMessage());
        }
    }
    @Override
    public RegisResDTO addRegistration(RegisCreateDTO regisCreateDTO) {
        Registration regis = new Registration().convertCreToRegistrations(regisCreateDTO);
        try {
            if (regis.getCustomerInfo().getId() == null || regis.getCustomerInfo().getId().isEmpty()){
                throw new UserCreationException("User ID is required.");
            }
            if (regis.getProductInfo().getPlanId()==null){
                throw new UserCreationException("Plan ID is required.");
            }
            if(regis.getTotalFee() <= 0){
                throw new UserCreationException("Total fee must be more than 0.");
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
            return regis.convertToRegisResDTO();
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
    public RegisResDTO updateRegisImageOrFileDocUrl(ObjectId regisId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts) {
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
                document.setUrls(docUrls);
                documentList.add(document);
            }
            Instant instantNow = Instant.now();
            existingRegis.setUpdatedAt(instantNow);

            List<Registration.documentRegiss> docLists = new ArrayList<>();
            if(existingRegis.getDocumentUrls() == null) docLists.addAll(documentList);
            else {
                docLists = existingRegis.getDocumentUrls();
                List<Registration.documentRegiss> toAdd = new ArrayList<>();

                for (Registration.documentRegiss docAdd : documentList) {
                    boolean isPresent = false;
                    for (Registration.documentRegiss doc : docLists) {
                        if (doc.getDocCategory().equals(docAdd.getDocCategory())) {
                            if (doc.getUrls() == null) {
                                doc.setUrls(new ArrayList<>()); // Khởi tạo nếu null
                            }
                            doc.getUrls().addAll(docAdd.getUrls());
                            isPresent = true;
                            break;
                        }
                    }
                    if (!isPresent) {
                        toAdd.add(docAdd);
                    }
                }
                docLists.addAll(toAdd);
            }
            existingRegis.setDocumentUrls(docLists);
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
            Instant instantNow = Instant.now();
            existingRegis.setUpdatedAt(instantNow);
            List<Registration.documentRegiss> docLists = new ArrayList<>();
            if(existingRegis.getDocumentUrls() == null) docLists.addAll(documentList);
            else {
                docLists = existingRegis.getDocumentUrls();
                List<Registration.documentRegiss> toAdd = new ArrayList<>();

                for (Registration.documentRegiss docAdd : documentList) {
                    boolean isPresent = false;
                    for (Registration.documentRegiss doc : docLists) {
                        if (doc.getDocCategory().equals(docAdd.getDocCategory())) {
                            if (doc.getUrls() == null) {
                                doc.setUrls(new ArrayList<>()); // Khởi tạo nếu null
                            }
                            doc.getUrls().addAll(docAdd.getUrls());
                            isPresent = true;
                            break;
                        }
                    }
                    if (!isPresent) {
                        toAdd.add(docAdd);
                    }
                }
                docLists.addAll(toAdd);
            }
            existingRegis.setDocumentUrls(docLists);
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

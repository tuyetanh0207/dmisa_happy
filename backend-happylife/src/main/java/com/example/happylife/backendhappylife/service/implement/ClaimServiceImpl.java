package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimUpdateStaffDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.ClaimRepo;
import com.example.happylife.backendhappylife.service.ClaimService;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClaimServiceImpl implements ClaimService {
    @Autowired
    private ClaimRepo claimRepo;

    //Service for Manager
    @Override
    public List<Claim> getAllClaim() {
        try{
            List<Claim> claims = claimRepo.findAll();
            return claims;
        } catch (Exception e){
            throw new UserCreationException("Error geting claims:" + e.getMessage());
        }
    }

    @Override
    public Claim updateClaimStatus(UserResDTO authUser, ObjectId claimId, ClaimResDTO claim, Message msg) {
        try {
            if (authUser.getRole() == Role.INSUARANCE_MANAGER || authUser.getRole() == Role.ACCOUNTANT) {
                Instant instantNow = Instant.now();
                if (claim.getStatus().equals("Pending Review") ||
                        claim.getStatus().equals("Pending Additional Information") ||
                        claim.getStatus().equals("In Process") ||
                        claim.getStatus().equals("Approved") ||
                        claim.getStatus().equals("Payment Issued") ||
                        claim.getStatus().equals("Denied")) {
                    Claim claimVar = claimRepo.findById(claimId)
                            .orElseThrow(() -> new EntityNotFoundException("Claim not found with id: " + claimId));
                    claimVar.setStatus(claim.getStatus());
                    // msg process
                    msg.setDateMessage(instantNow);
                    if(claimVar.getMessage()!=null){
                        System.out.println("not null");
                        List<Message> msgList = claimVar.getMessage();
                        msgList.add(msg);
                        claimVar.setMessage(msgList);
                    } else{
                        System.out.println("null");
                        claimVar.setMessage(Arrays.asList(msg));
                    }

                    if (claim.getStatus().equals("Approved")) {
                        // Tạo InvoiceCreateDTO và gọi phương thức tạo hóa đơn
//                        InvoiceCreateDTO invoiceCreateDTO = new InvoiceCreateDTO();
//                        Instant instantNow = Instant.now();
//                        Instant dueDateInstant = claimVar.getEndDate().plus(10, ChronoUnit.DAYS);
//                        invoiceCreateDTO.setDueDate(dueDateInstant);
//                        invoiceCreateDTO.setPaymentStatus("Pending");
//                        Invoice invoice = new Invoice();
//                        Invoice invoiceCreated = invoice.convertCreToInvoice(invoiceCreateDTO);
//                        invoiceService.addInvoice(invoiceCreated);
                    }
                    return claimRepo.save(claimVar);
                } else {
                    throw new UserCreationException("Error updating status of claim: status is invalid.");
                }
            } else {
                throw new UserCreationException("Error updating status of claim, you need an authenticated account to do this action.");
            }
        }
        catch (UserCreationException e){
            throw new UserCreationException("Error updating status of claim."+e.getMessage());
        }
    }

    @Override
    public Claim updateClaimByStaff(UserResDTO authUser, ObjectId claimId, ClaimUpdateStaffDTO claim){
        Claim existingClaim = claimRepo.findById(claimId)
                .orElseThrow(() ->new EntityNotFoundException("Claim not found with id: " + claimId));
        try {
            if(claim.getRegisInfo()!=null){
                existingClaim.setRegisInfo(claim.getRegisInfo());
            }
            if(claim.getClaimCategories()!=null){
                existingClaim.setClaimCategories(claim.getClaimCategories());
            }
            if(claim.getClaimAmount()!=null){
                existingClaim.setClaimAmount(claim.getClaimAmount());
            }
            if(claim.getClaimInvoices()!=null){
                existingClaim.setClaimInvoices(claim.getClaimInvoices());
            }
            if(claim.getClaimTotalRequest()!=0){
                existingClaim.setClaimTotalRequest(claim.getClaimTotalRequest());
            }
            Instant instantNow = Instant.now();
            existingClaim.setUpdatedAt(instantNow);
            claimRepo.save(existingClaim);
            return existingClaim;


        } catch (Exception e){
            throw new UserCreationException("Error updating claim: " + e.getMessage());
        }
    }
    //Service for Customer
    @Override
    public ClaimResDTO addClaim(ClaimCreateDTO claimCreateDTO){
        Claim claim = new Claim().convertCreToClaim(claimCreateDTO);
        try {
           /* if(claim.getClaimAmount() == null){
                throw new UserCreationException("Claim Amount must be exist.");
            }*/
            if(claim.getClaimCategories() == null){
                throw new UserCreationException("There must be at least 1 claim scenario provided.");
            }
            if(claim.getDocumentUrls().isEmpty()){
                throw new UserCreationException("There must be at least 1 document provided.");
            }
            if(claim.getRegisInfo() == null){
                throw new UserCreationException("Regis info can't be null.");
            }

            claim.setStatus("Pending");
            for(Claim.ClaimInvoices claimInvoices : claim.getClaimInvoices()){
                claimInvoices.setStatus("Pending");
            }
            Instant instantNow = Instant.now();
            claim.setCreatedAt(instantNow);
            claim.setUpdatedAt(instantNow);
            claimRepo.save(claim);
            return claim.convertClaimToRes();
        } catch (Exception e){
            throw  new UserCreationException("Error to request the new claim : "+ e.getMessage());
        }
    }
    //Service for Both
    @Override
    public List<ClaimResDTO> getAllClaimByUserId(UserResDTO user, ObjectId userId) {
        try{
            if(user.getId().equals(userId.toString())){
                List<Claim> claims = claimRepo.findByRegisInfo_CustomerInfoId(userId.toString());
                List<ClaimResDTO> claimsRes = claims.stream()
                        .map(Claim::convertClaimToRes)
                        .collect(Collectors.toList());
                return claimsRes;
            }
            else if(user.getRole() == Role.INSUARANCE_MANAGER || user.getRole() == Role.ACCOUNTANT){
                List<Claim> claims = claimRepo.findByRegisInfo_CustomerInfoId(userId.toString());
                List<ClaimResDTO> claimsRes = claims.stream()
                        .map(Claim::convertClaimToRes)
                        .collect(Collectors.toList());
                return claimsRes;
            }
        } catch (Exception e) {

            throw new UserCreationException("Error getting user's claims: " + e.getMessage());
        }
        return null;
    }

    //Service for image and files
    @Override
    public ClaimResDTO updateClaimImageDocUrl(ObjectId claimId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts) {
        Claim existingClaim = claimRepo.findById(claimId)
                .orElseThrow(() -> new EntityNotFoundException("Claim not found with id: " + claimId));
        try {
            Iterator<String> urlIterator = uploadedUrls.iterator();
            List<Claim.documentClaims> documentList = new ArrayList<>();

            for (SectionFileCount fileCount : sectionFileCounts) {
                Claim.documentClaims document = new Claim.documentClaims();
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
            existingClaim.setDocumentUrls(documentList);
            Instant instantNow = Instant.now();
            existingClaim.setUpdatedAt(instantNow);
            Claim updatedClaim = claimRepo.save(existingClaim);
            ClaimResDTO claimResDTO = updatedClaim.convertToClaimResDTO();
            return claimResDTO;
        } catch (Exception e) {
            throw new UserCreationException("Error update Claim: " + e.getMessage());
        }
    }
    @Override
    public ClaimResDTO updateClaimFilesDocUrl(ObjectId claimId,
                                              List<String> uploadedUrls,
                                              List<SectionFileCount> sectionFileCounts) {
        Claim existingClaim = claimRepo.findById(claimId)
                .orElseThrow(() -> new EntityNotFoundException("Claim not found with id: " + claimId));
        try {
            Iterator<String> urlIterator = uploadedUrls.iterator();
            List<Claim.documentClaims> documentList = new ArrayList<>();

            for (SectionFileCount fileCount : sectionFileCounts) {
                Claim.documentClaims document = new Claim.documentClaims();
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
            existingClaim.setUpdatedAt(instantNow);
            existingClaim.setDocumentUrls(documentList);
            Claim updatedClaim = claimRepo.save(existingClaim);
            ClaimResDTO claimResDTO = updatedClaim.convertToClaimResDTO();
            return claimResDTO;
        } catch (Exception e) {
            throw new UserCreationException("Error update Claim: " + e.getMessage());
        }
    }
}

package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimCreateDTO;
import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.ClaimRepo;
import com.example.happylife.backendhappylife.service.ClaimService;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

@Service
public class ClaimServiceImpl implements ClaimService {
    @Autowired
    private ClaimRepo claimRepo;

    @Override
    public Claim addClaim(UserResDTO authUser, Claim claim){
        try {
            if (authUser.getRole() == Role.CUSTOMER) {
                return null;
                /*} else{
                    throw  new UserCreationException("Error updating status of claimtration: status is invalid.");
                }*/
            } else {
                throw  new UserCreationException("Error to request the new claim, you need an authenticated account to do this action.");
            }
        } catch (Exception e){
            throw  new UserCreationException("Error to request the new claim : "+ e.getMessage());
        }
    }

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
                        claimVar.getMessage().add(msg);
                        claimVar.setMessage(claim.getMessage());
                    } else{

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
}

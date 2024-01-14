package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Contract;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.ContractRepo;
import com.example.happylife.backendhappylife.repo.RegistrationRepo;
import com.example.happylife.backendhappylife.service.ContractService;
import com.example.happylife.backendhappylife.service.RegistrationService;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ContractServiceImpl implements ContractService {
    @Autowired
    private ContractRepo contractRepo;
    @Autowired
    private RegistrationService registrationService;
    @Override
    public List<Contract> getAllContract(User user) {
        try{
            if(user.getRole() == Role.INSUARANCE_MANAGER){
                List<Contract> contracts = contractRepo.findAll();
                return contracts;
            }
        }
        catch(Exception e){
            throw new UserCreationException("Error to get: " + e.getMessage());
        }
        return null;
    }
    @Override
    public Contract addContract(Contract contract){
        if (contract.getRegisInfo() == null) {
            throw new UserCreationException("Regis information is required.");
        }
        if(contract.getStatus() != "Awaiting"){
            throw new UserCreationException("Contract's status must be Awaiting.");
        }
        if(!contract.getConfirmation()){
            throw new UserCreationException("Contract's confirmation must be False.");
        }
        try {
            Instant instantNow = Instant.now();
            contract.setCreatedAt(instantNow);
            contract.setUpdatedAt(instantNow);
            return contractRepo.save(contract);
        } catch (Exception e) {
            throw new UserCreationException("Error creating new Contract: " + e.getMessage());
        }
    }
    @Override
    public Contract updateContractStatus(Contract contract, ObjectId contractId){
        Contract existingContract = contractRepo.findById(contractId)
                .orElseThrow(() -> new EntityNotFoundException("Contract not found with id: " + contractId));
        if(!contract.getConfirmation()){
            //tạo noti reject
            existingContract.setStatus("Cancelled");
            Instant instantNow = Instant.now();
            existingContract.setUpdatedAt(instantNow);
            contractRepo.save(existingContract);
            return existingContract;
        }
        else{
            //tạo noti có hịiệu lực
            existingContract.setStatus("Effective");
            existingContract.setConfirmation(true);
            Instant instantNow = Instant.now();
            existingContract.setUpdatedAt(instantNow);
            ObjectId regisId = new ObjectId();
           /* if(contract.getRegisInfo().getRegisId() != null){
                regisId = new ObjectId(contract.getRegisInfo().getRegisId());
            }
            RegisResDTO regis = contract.getRegisInfo();
            regis.setApprovalStatus("unpaid");
            Registration regisUpd = new Registration();
            Registration savedRegis = regisUpd.convertToRegis(regis);
*/
            //registrationService.updateRegisStatus(user, regisId. savedRegis)
            //Chưa sử dụng được là vì phải thêm user selvet và đổi regisupdateDTO thành registration
            contractRepo.save(existingContract);
            return existingContract;
        }
    }
}

package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Contract;
import com.example.happylife.backendhappylife.entity.Enum.RegistrationEventEnum;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Object.Message;
import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.ContractRepo;
import com.example.happylife.backendhappylife.service.ContractService;
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
public class ContractServiceImpl implements ContractService {
    @Autowired
    private ContractRepo contractRepo;

    //Xử lí các event gọi các service khác
    @Autowired
    private ApplicationEventPublisher publisher;

    // Service for Manager
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
    public ContractResDTO addContract(ContractResDTO contractDto){
        Contract contract = new Contract().convertResToContract(contractDto);
        if (contract.getRegisInfo() == null) {
            throw new UserCreationException("Regis information is required.");
        }
        if(!"Awaiting".equals(contract.getStatus().trim())) {
            throw new UserCreationException("Contract's status must be Awaiting. : " + contract.getStatus());
        }
        if(contract.getConfirmation().booleanValue() != false){
            throw new UserCreationException("Contract's confirmation must be False." + contract.getConfirmation().toString());
        }
        try {
            Instant instantNow = Instant.now();
            contract.setCreatedAt(instantNow);
            contract.setUpdatedAt(instantNow);
            contractRepo.save(contract);
            return contract.convertToContractResDTO();
        } catch (Exception e) {
            throw new UserCreationException("Error creating new Contract: " + e.getMessage());
        }
    }

    //Service for Customer
    @Override
    public List<ContractResDTO> getContractByUserId(ObjectId userId, UserResDTO userRes){
        User userVar = new User().convertResToUser(userRes);
        try{
            if(userVar.getId().equals(userId)){
                List<Contract> contracts = contractRepo.findByRegisInfo_CustomerInfoId(userId.toString());
                List<ContractResDTO> contractRes = contracts.stream()
                                                .map(Contract::convertToContractResDTO)
                                                .collect(Collectors.toList());
                return contractRes;
            }
            else if(userVar.getRole() == Role.INSUARANCE_MANAGER || userVar.getRole() == Role.ACCOUNTANT){
                List<Contract> contracts = contractRepo.findByRegisInfo_CustomerInfoId(userId.toString());
                List<ContractResDTO> contractRes = contracts.stream()
                        .map(Contract::convertToContractResDTO)
                        .collect(Collectors.toList());
                return contractRes;
            }
        } catch (Exception e) {

            throw new UserCreationException("Error getting user's contracts: " + e.getMessage());
        }
        return null;
    }
    @Override
    public ContractResDTO updateContractStatus(ContractResDTO contractResDTO, ObjectId contractId, UserResDTO userVar){
        Contract contract = new Contract().convertResToContract(contractResDTO);
        User user = new User().convertResToUser(userVar);
        System.out.println("user Id" + user.getId().toString());
        try{
            Contract existingContract = contractRepo.findById(contractId)
                    .orElseThrow(() -> new EntityNotFoundException("Contract not found with id: " + contractId));
            if(!existingContract.getRegisInfo().getCustomerInfo().getId().equals(userVar.getId())){
                throw new UserCreationException("User don't have permission to signed this contract");
            }

            if(contract.getConfirmation() == false){
                //Thông báo manager customer không kí hợp đồng
                existingContract.setStatus("Cancelled");
                Instant instantNow = Instant.now();
                existingContract.setUpdatedAt(instantNow);
                contractRepo.save(existingContract);
                return existingContract.convertToContractResDTO();
            }
            else{
                existingContract.setStatus("Effective");
                existingContract.setConfirmation(true);
                Instant instantNow = Instant.now();
                existingContract.setUpdatedAt(instantNow);
                ObjectId regisId = new ObjectId();
                if(contract.getRegisInfo().getRegisId() != null){
                    regisId = new ObjectId(contract.getRegisInfo().getRegisId());
                }
                RegisResDTO regis = existingContract.getRegisInfo();
                regis.setRegisId(regisId.toString());
                regis.setApprovalStatus("Signed");
                Message mes = new Message();
                mes.setContent("Bạn đã kí hợp đồng thành công và bạn cần thanh toán!");
                mes.setDateMessage(instantNow);
                regis.getMessage().add(mes);
                Registration regisUpd = new Registration().convertToRegis(regis);
                RegistrationEventEnum method = RegistrationEventEnum.updateStatus;
                publisher.publishEvent(new RegistrationEvent(regisUpd, method));
                contractRepo.save(existingContract);
                return existingContract.convertToContractResDTO();
                //Tạo thêm một event gọi addNoti
            }
        } catch (Exception e) {
            throw new UserCreationException("Error updating Contract: " + e.getMessage());
        }
    }

    @Override
    public ContractResDTO getContractByRegisId(UserResDTO userVar, ObjectId regisId){
        try{
            User user = new User().convertResToUser(userVar);
            Contract existingContract = contractRepo.findByRegisInfo_RegisId(regisId.toString())
                    .orElseThrow(() -> new EntityNotFoundException("Contract not found with id: " + regisId));
            if(existingContract.getRegisInfo().getCustomerInfo().getId().equals(user.getId().toString())){
                return existingContract.convertToContractResDTO();
            }
            else if(user.getRole() == Role.ACCOUNTANT || user.getRole() == Role.INSUARANCE_MANAGER){
                return existingContract.convertToContractResDTO();
            }
            return null;
        } catch (Exception e){
            throw  new UserCreationException("Error get registration: "+ e.getMessage());
        }
    }
    //Service for image and files
}

package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Contract;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.User;
import org.bson.types.ObjectId;

import java.util.List;

public interface ContractService {
    List<Contract> getAllContract(User user);
    //Contract addContract(Contract contract);
    ContractResDTO addContract(ContractResDTO contractDto);

    //Service for Customer
    List<ContractResDTO> getContractByUserId(ObjectId userId, UserResDTO userVar);

    //Service for Customer
    ContractResDTO updateContractStatus(ContractResDTO contract, ObjectId contractId, UserResDTO userVar);

    ContractResDTO getContractByRegisId(UserResDTO userVar, ObjectId regisId);

    ContractResDTO updateContractFileContentUrl(ObjectId contractId,
                                                List<String> uploadedUrls);

    ContractResDTO updateContractImageContentUrl(ObjectId contractId,
                                                 List<String> uploadedUrls);

    //Service for image and files

}

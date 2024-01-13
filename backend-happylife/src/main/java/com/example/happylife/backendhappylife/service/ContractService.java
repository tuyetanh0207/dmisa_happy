package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.entity.Contract;
import com.example.happylife.backendhappylife.entity.User;
import org.bson.types.ObjectId;

import java.util.List;

public interface ContractService {
    List<Contract> getAllContract(User user);

    Contract addContract(Contract contract);

    Contract updateContractStatus(Contract contract, ObjectId contractId);
}

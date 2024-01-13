package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Contract;
import com.example.happylife.backendhappylife.entity.Invoice;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContractRepo extends MongoRepository<Contract, ObjectId> {
}

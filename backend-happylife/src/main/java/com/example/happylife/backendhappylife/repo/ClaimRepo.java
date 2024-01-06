package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Claim;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ClaimRepo extends MongoRepository<Claim, ObjectId> {
    List<Claim> findByRegisInfo_CustomerInfo(String id);
}

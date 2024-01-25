package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Claim;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ClaimRepo extends MongoRepository<Claim, ObjectId> {
    List<Claim> findByRegisInfo_CustomerInfoId(String regisInfo_customerInfo_id);

    List<Claim> findByRegisInfo_CustomerInfoIdAndRegisInfo_RegisId(String regisInfo_customerInfo_id, String regisInfo_regisId);

    List<Claim> findByRegisInfo_RegisId(String regisId);

    List<Claim> findByRegisInfo_CustomerInfo_Id(ObjectId regisInfo_customerInfo_id);
}


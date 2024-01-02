package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Registration;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepo extends MongoRepository<Registration, ObjectId> {


    @Query("{ 'productInfo.planId': ?0, 'approvalStatus': ?1 }")
    List<Registration> findAllByProductInfoAndApprovalStatus(String id, String approvalStatus);

    default void setMongoTemplate(MongoTemplate mongoTemplate) {
        // Setter for MongoTemplate
    }
}
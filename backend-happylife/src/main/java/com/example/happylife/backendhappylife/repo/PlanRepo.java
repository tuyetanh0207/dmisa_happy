package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Plan;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlanRepo extends MongoRepository<Plan, ObjectId> {
    //List<InsurancePlan> getInsurancePlanByName(String insurancePlanName);
    //InsurancePlan findbyName(String insurancePlanName);
}

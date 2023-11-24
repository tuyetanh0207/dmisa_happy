package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.InsurancePlan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InsurancePlanRepo extends MongoRepository<InsurancePlan,Integer> {}

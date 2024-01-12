package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Registration;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RegistrationRepo extends MongoRepository<Registration, ObjectId> {
    List<Registration> findByCustomerInfo_Id(String id);
    List<Registration> findAllByCustomerInfo_Id(String id);
}

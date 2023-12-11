package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Registration;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RegistrationRepo extends MongoRepository<Registration, ObjectId> {

}

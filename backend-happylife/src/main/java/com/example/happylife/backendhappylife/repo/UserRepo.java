package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, ObjectId> {


    Optional<User> findByPhoneNumber(String phoneNumber);
}

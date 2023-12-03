package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {


    Optional<User> findByPhoneNumber(String phoneNumber);
}

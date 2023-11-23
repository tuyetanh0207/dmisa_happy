package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {
}

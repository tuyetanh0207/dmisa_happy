package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Claim;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClaimRepo extends MongoRepository<Claim, ObjectId> {
}

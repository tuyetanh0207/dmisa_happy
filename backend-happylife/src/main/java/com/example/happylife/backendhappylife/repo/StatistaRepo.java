package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Statista;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StatistaRepo extends MongoRepository<Statista, ObjectId> {
    Statista findByYear(Integer year);
}

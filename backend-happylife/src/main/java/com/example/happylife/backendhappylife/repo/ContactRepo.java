package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Contact;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepo extends MongoRepository<Contact, ObjectId> {
}

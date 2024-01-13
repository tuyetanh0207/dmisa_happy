package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Notification;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepo extends MongoRepository<Notification, ObjectId> {
    List<Notification> findByUserInfo(String userId);
}

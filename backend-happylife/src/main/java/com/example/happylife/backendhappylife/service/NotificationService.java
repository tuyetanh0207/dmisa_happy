package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.entity.Notification;
import com.example.happylife.backendhappylife.entity.User;

import java.util.List;

public interface NotificationService {
    List<Notification> getNotifications(User user);
}

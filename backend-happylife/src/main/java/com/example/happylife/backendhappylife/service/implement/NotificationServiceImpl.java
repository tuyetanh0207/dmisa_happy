package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Notification;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.repo.NotificationRepo;
import com.example.happylife.backendhappylife.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepo notificationRepo;

    @Override
    public List<Notification> getNotifications(User user) {
        if(user.getRole() == Role.CUSTOMER) {
            List<Notification> notificationList = notificationRepo.findByUserInfo(user.getId().toString());
            return notificationList;
        }
        return null;
    }

//    @Override
//    public NotificationResDTO createNotification(NotificationResDTO noti) {
////        if (noti.getNotiTitle()== null) {
////
////        }
//
//
//    }

}

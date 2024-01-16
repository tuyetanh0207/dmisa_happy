package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Notification;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.NotificationRepo;
import com.example.happylife.backendhappylife.service.NotificationService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepo notificationRepo;

    //Service for Customer
    @Override
    public List<NotificationResDTO> getNotificationsById(UserResDTO userVar, ObjectId userId) {
        User user = new User().convertResToUser(userVar);
        try{
            if(user.getId().toString().equals(userId)) {
                List<Notification> notificationList = notificationRepo.findByUserInfo(userId.toString());
                List<NotificationResDTO> notificationResDTOS = notificationList.stream()
                        .map(notification -> notification.convertToNotificationResDTO())
                        .collect(Collectors.toList());
                return notificationResDTOS;
            }
            else if(user.getRole() == Role.ACCOUNTANT){
                List<Notification> notificationList = notificationRepo.findByUserInfo(userId.toString());
                List<NotificationResDTO> notificationResDTOS = notificationList.stream()
                        .map(notification -> notification.convertToNotificationResDTO())
                        .collect(Collectors.toList());
                return notificationResDTOS;
            }
        } catch (Exception e) {

            throw new UserCreationException("Error getting user's noti: " + e.getMessage());
        }
        return null;
    }
}

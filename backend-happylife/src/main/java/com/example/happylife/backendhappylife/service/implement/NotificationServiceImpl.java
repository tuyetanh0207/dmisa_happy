package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationListDTO;
import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.Notification;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.NotificationRepo;
import com.example.happylife.backendhappylife.service.NotificationService;
import jakarta.persistence.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepo notificationRepo;

    //Service mock

    //Service for Customer
    @Override
    public List<NotificationResDTO> getNotificationsById(UserResDTO userVar, ObjectId userId) {
        User user = new User().convertResToUser(userVar);
        try{
            if(user.getId().toString().equals(userId.toString())) {
                List<Notification> notificationList = notificationRepo.findByUserInfo(userId.toString());
                List<NotificationResDTO> notificationResDTOS = notificationList.stream()
                        .map(notification -> notification.convertToNotificationResDTO())
                        .collect(Collectors.toList());
                return notificationResDTOS;
            }
            else if(user.getRole() == Role.INSUARANCE_MANAGER){
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
    @Override
    public List<NotificationResDTO> updateAllStatusOfNotiUser(UserResDTO userVar) {
        try{
            User user = new User().convertResToUser(userVar);
            Instant instantNow = Instant.now();
            List<Notification> existingNotifications = notificationRepo.findByUserInfo(user.getId().toString());
            for(Notification notiVar : existingNotifications){
                if(!notiVar.getNotiStatus()){
                    notiVar.setNotiStatus(true);
                    notiVar.setUpdatedAt(instantNow);
                } else continue;
            }
            notificationRepo.saveAll(existingNotifications);
            List<NotificationResDTO> notificationResDTOS = existingNotifications.stream()
                    .map(notification -> notification.convertToNotificationResDTO())
                    .collect(Collectors.toList());
            return notificationResDTOS;
        } catch (Exception e) {
            throw new UserCreationException("Error getting user's noti: " + e.getMessage());
        }
    }
    @Override
    public NotificationResDTO updateStatusOfNotiUser(UserResDTO userVar, ObjectId notiId) {
        try{
            User user = new User().convertResToUser(userVar);
            Notification existingNotification = notificationRepo.findById(notiId)
                    .orElseThrow(() -> new EntityNotFoundException("Notification not found with id: " + notiId));
            if(existingNotification.getUserInfo().equals(user.getId())){
                existingNotification.setNotiStatus(true);
                Instant instantNow = Instant.now();
                existingNotification.setUpdatedAt(instantNow);
                notificationRepo.save(existingNotification);
                return existingNotification.convertToNotificationResDTO();
            } else {
                throw new UserCreationException("Error update user's noti" );
            }
        } catch (Exception e) {
            throw new UserCreationException("Error update user's noti: " + e.getMessage());
        }
    }

    @Override
    public NotificationListDTO getListOfFalseStatus(UserResDTO userVar){
        try{
            User user = new User().convertResToUser(userVar);
            List<Notification> existingNotifications = notificationRepo.findByUserInfo(user.getId().toString());
            int count = 0;
            for(Notification notiVar : existingNotifications){
                if(!notiVar.getNotiStatus()){
                    count++;
                } else continue;
            }
            List<NotificationResDTO> notificationResDTOS = existingNotifications.stream()
                    .map(notification -> notification.convertToNotificationResDTO())
                    .collect(Collectors.toList());
            NotificationListDTO notiList = new NotificationListDTO();
            notiList.setAmountOfFalseStatus(count);
            notiList.setNotificationResDTOS(notificationResDTOS);
            return notiList;
        } catch (Exception e) {
            throw new UserCreationException("Error getting user's noti: " + e.getMessage());
        }
    }
    @Override
    public NotificationResDTO addNotiAuto(NotificationResDTO notificationResDTO){
        System.out.println("Id noti error one ");

        Notification notification = new Notification().convertResToNoti(notificationResDTO);
        try {
            if (notification.getNotiTitle() == null) {
                throw new UserCreationException("Notification Title is required.");
            }
            if(notification.getNotiContent() == null) {
                throw new UserCreationException("Notification Content is required.");
            }
            if(notification.getUserInfo() == null){
                throw new UserCreationException("User id is required.");
            }
            Instant instantNow = Instant.now();
            notification.setNotiStatus(false);
            notification.setCreatedAt(instantNow);
            notification.setUpdatedAt(instantNow);
            notificationRepo.save(notification);
            return notification.convertToNotificationResDTO();
        } catch (Exception e) {
            throw new UserCreationException("Error creating new Contract: " + e.getMessage());
        }
    }
}

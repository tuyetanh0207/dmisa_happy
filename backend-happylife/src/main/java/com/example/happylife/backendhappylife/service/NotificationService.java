package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationListDTO;
import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import org.bson.types.ObjectId;

import java.util.List;

public interface NotificationService {


    //Service for Customer
    List<NotificationResDTO> getNotificationsById(UserResDTO userVar, ObjectId userId);

    List<NotificationResDTO> updateAllStatusOfNotiUser(UserResDTO userVar);

    NotificationResDTO updateStatusOfNotiUser(UserResDTO userVar, ObjectId notiId);

    NotificationListDTO getListOfFalseStatus(UserResDTO userVar);
}

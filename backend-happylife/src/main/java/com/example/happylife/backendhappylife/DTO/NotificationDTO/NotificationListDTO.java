package com.example.happylife.backendhappylife.DTO.NotificationDTO;

import lombok.Getter;

import java.util.List;

@Getter
public class NotificationListDTO {
    private List<NotificationResDTO> notificationResDTOS;
    private int amountOfFalseStatus;

    public void setNotificationResDTOS(List<NotificationResDTO> notificationResDTOS) {
        this.notificationResDTOS = notificationResDTOS;
    }

    public void setAmountOfFalseStatus(int amountOfFalseStatus) {
        this.amountOfFalseStatus = amountOfFalseStatus;
    }
}

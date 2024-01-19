package com.example.happylife.backendhappylife.DTO.NotificationDTO;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import jakarta.persistence.Column;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;

@Getter
public class NotificationResDTO {
    private String notificationId;
    private ObjectId userInfo;
    private String notiTitle;
    private String notiContent;
    private Boolean notiStatus;
    private String notiType;
    private String notiPrio;
    private Instant createdAt;
    private Instant updatedAt;


    public void setNotificationId(String notificationId) {
        this.notificationId = notificationId;
    }

    public void setUserInfo(ObjectId userInfo) {
        this.userInfo = userInfo;
    }

    public void setNotiTitle(String notiTitle) {
        this.notiTitle = notiTitle;
    }

    public void setNotiContent(String notiContent) {
        this.notiContent = notiContent;
    }

    public void setNotiStatus(Boolean notiStatus) {
        this.notiStatus = notiStatus;
    }

    public void setNotiType(String notiType) {
        this.notiType = notiType;
    }

    public void setNotiPrio(String notiPrio) {
        this.notiPrio = notiPrio;
    }

    public void setCreatedAt(Instant createdAt) {
        createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        updatedAt = updatedAt;
    }
}

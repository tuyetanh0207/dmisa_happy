package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.NotificationDTO.NotificationResDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Notification")
public class Notification {
    @Id
    private ObjectId notificationId;
    @Column(nullable = false)
    private ObjectId userInfo;
    @Column(nullable = false)
    private String notiTitle;
    @Column(nullable = false)
    private String notiContent;
    @Column(nullable = false)
    private Boolean notiStatus;
    @Column(nullable = false)
    private String notiType;
    private String notiPrio;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant createdAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant updatedAt;
    public Notification convertResToNoti(NotificationResDTO dto) {
        Notification notification = new Notification();
        if(dto.getNotificationId() != null){
            ObjectId dtoId = new ObjectId(dto.getNotificationId());
            notification.setNotificationId(dtoId);
        }
        notification.setNotiPrio(dto.getNotiPrio());
        notification.setNotiContent(dto.getNotiContent());
        notification.setNotiStatus(dto.getNotiStatus());
        notification.setNotiType(dto.getNotiType());
        notification.setNotiTitle(dto.getNotiTitle());
        notification.setUpdatedAt(dto.getUpdatedAt());
        notification.setCreatedAt(dto.getCreatedAt());
        notification.setUserInfo(dto.getUserInfo());
        return notification;
    }
    public NotificationResDTO convertToNotificationResDTO() {
        NotificationResDTO dto = new NotificationResDTO();
        if(this.notificationId != null) dto.setNotificationId(this.notificationId.toString());
        dto.setNotiPrio(this.notiPrio);
        dto.setNotiContent(this.notiContent);
        dto.setNotiStatus(this.notiStatus);
        dto.setNotiType(this.notiType);
        dto.setNotiTitle(this.notiTitle);
        dto.setUpdatedAt(this.updatedAt);
        dto.setCreatedAt(this.createdAt);
        dto.setUserInfo(this.userInfo);
        return dto;
    }
}

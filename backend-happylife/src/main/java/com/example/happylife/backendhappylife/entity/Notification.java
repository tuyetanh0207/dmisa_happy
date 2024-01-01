package com.example.happylife.backendhappylife.entity;

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
    private UserResDTO userInfo;
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
    private Instant planCreatedAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant planUpdatedAt;

}

package com.example.happylife.backendhappylife.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.ZonedDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private String id;

     @Column(nullable = false)
     private String fullName;

     private String gender;

     @Temporal(TemporalType.DATE)
     private  Date DOB;

     @Column(nullable = false)
     private String phone;

     private String address;
     @Column(nullable = false)
     private String password;

     private String avatarUrl;
     private ZonedDateTime createdAt;
     private ZonedDateTime updatedAt;

}

package com.example.happylife.backendhappylife.DTO;

import com.example.happylife.backendhappylife.entity.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResDTO {
    private String id;


    private String fullName;

    private String gender;

    private Date DOB;


    private String phoneNumber;

    private String email;
    private String address;

    private String avatarUrl;

    private Instant createdAt;

    private Instant updatedAt;

    private Role role;


}

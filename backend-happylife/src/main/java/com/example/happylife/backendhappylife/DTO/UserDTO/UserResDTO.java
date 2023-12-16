package com.example.happylife.backendhappylife.DTO.UserDTO;

import com.example.happylife.backendhappylife.entity.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String citizenId;

    private String email;
    private String address;

    private String avatarUrl;

    private Instant createdAt;

    private Instant updatedAt;

    private Role role;


}

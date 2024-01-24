package com.example.happylife.backendhappylife.DTO.UserDTO;

import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.example.happylife.backendhappylife.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date DOB;
    private String phoneNumber;
    private String citizenId;
    private String email;
    private String address;
    private String avatarUrl;
    private User.HealthStatus healthStatus;
    private Instant createdAt;
    private Instant updatedAt;
    private Role role;


}

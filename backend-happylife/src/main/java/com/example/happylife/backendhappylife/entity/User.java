package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.UserResDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "user")
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private String id;

     @Column(nullable = false)
     private String fullName;

     private String gender;

     @Temporal(TemporalType.DATE)
     @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
     private  Date DOB;

     @Column(nullable = false)
     private String phoneNumber;
     //Column(nullable = false)
     private String citizenId;
     @Column(nullable = false)
     private String email;
     private String address;
     @Column(nullable = false)
     private String password;

     private String avatarUrl;
     @Field(targetType = FieldType.DATE_TIME)
     private Instant createdAt;
     @Field(targetType = FieldType.DATE_TIME)
     private Instant updatedAt;
     @Enumerated(EnumType.STRING)
     private Role role;

 @Override
 public Collection<? extends GrantedAuthority> getAuthorities() {

  return List.of(new SimpleGrantedAuthority(role.name()));
 }

 @Override
 public String getUsername() {
  return phoneNumber;
 }

 @Override
 public boolean isAccountNonExpired() {
  return true;
 }

 @Override
 public boolean isAccountNonLocked() {

  return true;
 }

 @Override
 public boolean isCredentialsNonExpired() {

  return true;
 }

 @Override
 public boolean isEnabled() {

  return true;
 }

 public UserResDTO convertFromUserToUserResDTO() {
  UserResDTO userResDTO = new UserResDTO();
  userResDTO.setId(id);
  userResDTO.setDOB(DOB);
  userResDTO.setAddress(address);
  userResDTO.setEmail(email);
  userResDTO.setPhoneNumber(phoneNumber);
  userResDTO.setGender(gender);
  userResDTO.setRole(role);
  userResDTO.setAvatarUrl(avatarUrl);
  userResDTO.setCreatedAt(createdAt);
  userResDTO.setUpdatedAt(updatedAt);
  userResDTO.setFullName(fullName);
  return userResDTO;
 }
}

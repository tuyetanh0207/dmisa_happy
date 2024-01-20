package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.bson.types.ObjectId;
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
     private ObjectId id;

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

     private HealthStatus healthStatus;

     private String avatarUrl;
     @Field(targetType = FieldType.DATE_TIME)
     private Instant createdAt;
     @Field(targetType = FieldType.DATE_TIME)
     private Instant updatedAt;
     @Enumerated(EnumType.STRING)
     private Role role;
     @Getter
     public static class Address {
         private String province;
         private String district;
         private String ward;
         private String streetAddress;
      public void setProvince(String province) {this.province = province;}
      public void setDistrict(String district) {this.district = district;}
      public void setWard(String ward) {this.ward = ward;}
      public void setStreetAddress(String streetAddress) {this.streetAddress = streetAddress;}
     }

     @Getter
     public static class HealthStatus {
      private String generalHealthStatus;
      private String managerReviewStatus;
      @Field(targetType = FieldType.DATE_TIME)
      private Instant updatedAt;
      private List<String> details;
      public void setGeneralHealthStatus(String generalHealthStatus) {this.generalHealthStatus = generalHealthStatus;}
      public void setManagerReviewStatus(String managerReviewStatus) {this.managerReviewStatus = managerReviewStatus;}
      public void setUpdatedAt(Instant updatedAt) {this.updatedAt = updatedAt;}
      public void setDetails(List<String> details) {this.details = details;}
     }


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
      userResDTO.setId(id.toString());
      userResDTO.setDOB(DOB);
      userResDTO.setAddress(address);
      userResDTO.setEmail(email);
      userResDTO.setPhoneNumber(phoneNumber);
      userResDTO.setGender(gender);
      userResDTO.setRole(role);
      userResDTO.setCitizenId(this.citizenId);
      userResDTO.setHealthStatus(this.healthStatus);
      userResDTO.setAvatarUrl(avatarUrl);
      userResDTO.setCreatedAt(createdAt);
      userResDTO.setUpdatedAt(updatedAt);
      userResDTO.setFullName(fullName);
      return userResDTO;
     }
    public User convertResToUser(UserResDTO dto) {
        User userVar = new User();
        if(dto.getId() != null){
            ObjectId dtoId = new ObjectId(dto.getId());
            userVar.setId(dtoId);
        }
        userVar.setDOB(dto.getDOB());
        userVar.setAddress(dto.getAddress());
        userVar.setHealthStatus(dto.getHealthStatus());
        userVar.setEmail(dto.getEmail());
        userVar.setPhoneNumber(dto.getPhoneNumber());
        userVar.setGender(dto.getGender());
        userVar.setCitizenId(dto.getCitizenId());
        userVar.setRole(dto.getRole());
        userVar.setAvatarUrl(dto.getAvatarUrl());
        userVar.setCreatedAt(dto.getCreatedAt());
        userVar.setUpdatedAt(dto.getUpdatedAt());
        userVar.setFullName(dto.getFullName());
        return userVar;
    }
}

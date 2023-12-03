package com.example.happylife.backendhappylife.DTO.auth;

import com.example.happylife.backendhappylife.DTO.UserResDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private UserResDTO userInfo;
}

package com.example.happylife.backendhappylife.Testing;


import com.example.happylife.backendhappylife.config.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class SigninTesting {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;

    @Test
    public void loginUserWithEmptyUsername() throws Exception {

        String requestBody = "{\n" +
                "    \"phoneNumber\": \"\",\n" +
                "    \"password\": \"123456\"\n" +
                "}";
        // Gọi endpoint cần xác thực với JWT token
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void loginUserWithEmptyPassword() throws Exception {

        String requestBody = "{\n" +
                "    \"phoneNumber\": \"0123456783\",\n" +
                "    \"password\": \"\"\n" +
                "}";
        // Gọi endpoint cần xác thực với JWT token
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void loginUserWithBothEmptyPasswordAndUsername() throws Exception {

        String requestBody = "{\n" +
                "    \"phoneNumber\": \"\",\n" +
                "    \"password\": \"\"\n" +
                "}";
        // Gọi endpoint cần xác thực với JWT token
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void loginUserWithInvalidUsername() throws Exception {

        String requestBody = "{\n" +
                "    \"phoneNumber\": \"1350912124\",\n" +
                "    \"password\": \"123456\"\n" +
                "}";
        // Gọi endpoint cần xác thực với JWT token
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void loginUserWithInvalidPassword() throws Exception {

        String requestBody = "{\n" +
                "    \"phoneNumber\": \"1350912124\",\n" +
                "    \"password\": \"123456125125\"\n" +
                "}";
        // Gọi endpoint cần xác thực với JWT token
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
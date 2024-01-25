package com.example.happylife.backendhappylife;


import com.example.happylife.backendhappylife.config.JwtService;
import com.example.happylife.backendhappylife.entity.Enum.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.HashMap;

@SpringBootTest
@AutoConfigureMockMvc
public class test {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;


    @Test
    public void loginUser() throws Exception {

        String requestBody = "{\n" +
                "    \"phoneNumber\": \"0123456783\",\n" +
                "    \"password\": \"123456\"\n" +
                "}";
        // Gọi endpoint cần xác thực với JWT token
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/signin")
                         .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
    @Test
    public void getRegistration_IM() throws Exception {
        UserDetails userDetails = new User("012343", "123456", new ArrayList<>());


        // Tạo một JWT token với người dùng giả định
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);

        // Gọi endpoint cần xác thực với JWT token
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/registrations")
                        .header("Authorization", "Bearer " + jwtToken)
                       // .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(MockMvcResultMatchers.status().isInternalServerError());
             //  .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
            //  .andExpect(MockMvcResultMatchers.jsonPath("$.username").isNotEmpty());

    }
    @Test
    public void updateRegistration_001() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\n" +
                "    \"regis\": \"\",\n" +
                "    \"message\": \"Your registration is created.\"\n" +
                "}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/registrations/update/001")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }



}

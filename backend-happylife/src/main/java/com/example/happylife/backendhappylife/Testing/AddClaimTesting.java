package com.example.happylife.backendhappylife.Testing;
import com.example.happylife.backendhappylife.config.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.HashMap;
@SpringBootTest
@AutoConfigureMockMvc
public class AddClaimTesting {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;
    @Test
    public void addClaimWithoutClaimCategories() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{" +
                "\"regisInfo\": {" +
                "\"regisId\" : \"ID12345\"" +
                "}]," +
                "\"claimInvoices\" : [{" +
                "\"claimAmount\" : 3" +
                "}]";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/claims/create")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void addClaimWithoutClaimInvoices() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"claimCategories\":[{" +
                "\"Something\"" +
                "}]," +
                "\"regisInfo\": {" +
                "\"regisId\" : \"ID12345\"" +
                "}]";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/claims/create")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}

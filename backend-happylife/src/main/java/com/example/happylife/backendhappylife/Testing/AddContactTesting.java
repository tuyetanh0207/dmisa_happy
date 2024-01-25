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
public class AddContactTesting {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;
    @Test
    public void addContactWithoutLogin() throws Exception {
        String requestBody = "{\"customerName\":\"John Doe\"," +
                "\"phoneNumber\":\"12124124\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"serviceType\":\"something\"," +
                "\"message\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/contacts/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
    @Test
    public void addContactWithBothEmptyPhoneNumberAndEmail() throws Exception {
        String requestBody = "{\"customerName\":\"John Doe\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"\"," +
                "\"serviceType\":\"something\"," +
                "\"message\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/contacts/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void addContactWithBothEmptyPhoneNumberButEmailIsNot() throws Exception {
        String requestBody = "{\"customerName\":\"John Doe\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"serviceType\":\"something\"," +
                "\"message\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/contacts/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
    @Test
    public void addContactWithBothEmptyEmailButPhoneNoIsNot() throws Exception {
        String requestBody = "{\"customerName\":\"John Doe\"," +
                "\"phoneNumber\":\"0834678755\"," +
                "\"email\":\"\"," +
                "\"serviceType\":\"something\"," +
                "\"message\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/contacts/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
    @Test
    public void addContactWithEmptyServiceType() throws Exception {
        String requestBody = "{\"customerName\":\"John Doe\"," +
                "\"phoneNumber\":\"0123456783\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"serviceType\":\"\"," +
                "\"message\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/contacts/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void addContactWithEmailIsNotValid() throws Exception {
        String requestBody = "{\"customerName\":\"John Doe\"," +
                "\"phoneNumber\":\"0123456783\"," +
                "\"email\":\"huuphuc1256gmail.com\"," +
                "\"serviceType\":\"\"," +
                "\"message\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/contacts/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void addContactWithEmptyCustomerName() throws Exception {
        String requestBody = "{\"customerName\":\"\"," +
                "\"phoneNumber\":\"0123456783\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"serviceType\":\"\"," +
                "\"message\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/contacts/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void addContactWithEmptyMessage() throws Exception {
        String requestBody = "{\"customerName\":\"\"," +
                "\"phoneNumber\":\"0123456783\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"serviceType\":\"something\"," +
                "\"message\":\"\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/contacts/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}

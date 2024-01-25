package com.example.happylife.backendhappylife.Testing;
import com.example.happylife.backendhappylife.config.JwtService;
import org.springframework.security.core.userdetails.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.HashMap;

@SpringBootTest
@AutoConfigureMockMvc
public class UpdateTesting {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;

    // 03-001: Update user info with empty Full name
    @Test
    public void updateUserWithEmptyFullName() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // 03-002: Update user info with empty Address
    @Test
    public void updateUserWithEmptyAddress() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // 03-003: Update user info with empty Citizen ID
    @Test
    public void updateUserWithEmptyCitizenID() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // 03-004: Update user info with empty Date of Birth
    @Test
    public void updateUserWithEmptyDateOfBirth() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // 03-005: Update user info with Date of Birth in wrong format (expecting "dd/mm/yyyy")
    @Test
    public void updateUserWithWrongDateFormat() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"DOB\":\"02-12-abc\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // 03-006: Update user info with Email empty
    @Test
    public void updateUserWithEmailEmpty() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // 03-007: Update user info with Email in wrong format (no domain name like "bcxyz@")
    @Test
    public void updateUserWithEmailNoDomain() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"huuphuc1256mail.com@\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // 03-008: Update user info with Email in wrong format (starting with '@')
    @Test
    public void updateUserWithEmailStartingWithAt() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"@huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // 03-009: Update user info with Email not following the format "abc@gmail.com" or similar patterns
    @Test
    public void updateUserWithEmailInvalidPattern() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"huuphuc1256@ávasom\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // 03-010: Update user info with Phone number not registered
    @Test
    public void updateUserWithUnregisteredPhoneNumber() throws Exception {
        UserDetails userDetails = new User("0123456783", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"125124124\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/001/update")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}

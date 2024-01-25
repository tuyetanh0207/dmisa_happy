package com.example.happylife.backendhappylife.Testing;
import com.example.happylife.backendhappylife.config.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class SignupTesting {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;
    // Test case 02-001: Register with empty email
    @Test
    public void registerWithEmptyEmail() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123456789\"," +
                "\"email\":\"\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithEmptyPassword() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123456789\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithInvalidEmailForm1() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123456789\"," +
                "\"email\":\"huuphuc1256gmail.com@\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithInvalidEmailForm2() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123456789\"," +
                "\"email\":\"@huuphuc1256gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithInvalidEmailForm3() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123456789\"," +
                "\"email\":\"huuphuc1256@abcsd\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithEmptyFullname() throws Exception {
        String requestBody = "{\"fullName\":\"\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123456789\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithEmptyCitizenID() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123456789\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithEmptyUsername() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithExistUsername() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123456783\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithUsernameWithLengthNotEqual10() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithUsernameWithAlphabet() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123124adqwfqf\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"123 Main St\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void registerWithEmptyAddress() throws Exception {
        String requestBody = "{\"fullName\":\"John Doe\"," +
                "\"citizenId\":\"ID12345\"," +
                "\"gender\":\"Male\"," +
                "\"phoneNumber\":\"0123456782\"," +
                "\"email\":\"huuphuc1256@gmail.com\"," +
                "\"password\":\"123456\"," +
                "\"address\":\"\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}

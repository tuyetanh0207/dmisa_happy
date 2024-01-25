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
public class CreateRegisTesting {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService jwtService;

    @Test
    public void addNewRegisWithOutChooseAgeRange() throws Exception {
        UserDetails userDetails = new User("0344193909", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{" +
                "\"customerInfo\":{" +
                "\"id\":\"657d8946c349fe4049fb7c8b\"," + // Dấu phẩy sau mỗi khóa/giá trị
                "\"name\":\"John Doe\"," +
                "\"email\":\"johndoe@example.com\"" + // Không cần dấu phẩy ở cuối đối tượng, nhưng cần trước "productInfo"
                "}," +
                "\"productInfo\":{" +
                "\"planId\":\"65acede0a680637ecb9af06c\"," + // Dấu phẩy sau mỗi khóa/giá trị
                "\"name\":\"Health Insurance\"," + // Thiếu dấu phẩy ở đây
                "\"planType\":[{" +
                "\"typeName\":\"Premium\"," + // Thiếu dấu phẩy ở đây và sau mỗi khóa/giá trị
                "\"totalBenefits\":1000000," +
                "\"benefits\":[{" +
                "\"benefitName\":\"Hospitalization\"," +
                "\"dependencies\":\"Age\"," +
                "\"unit\":\"VND\"," +
                "\"insuranceAmount\":\"100000\"" + // Thiếu dấu phẩy ở đây
                "}]" +
                "}]," +
                "}," +
                "\"documentUrls\":[{" +
                "\"url\":\"http://example.com/doc1\"" + // Thiếu dấu phẩy ở đây
                "}]" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/registrations/create")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void addNewRegisWithOutChooseAnything() throws Exception {
        UserDetails userDetails = new User("0344193909", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{" +
                "\"customerInfo\":{" +
                "\"id\":\"657d8946c349fe4049fb7c8b\"," + // Dấu phẩy sau mỗi khóa/giá trị
                "\"name\":\"John Doe\"," +
                "\"email\":\"johndoe@example.com\"" + // Không cần dấu phẩy ở cuối đối tượng, nhưng cần trước "productInfo"
                "}," +
                "\"documentUrls\":[{" +
                "\"url\":\"http://example.com/doc1\"" + // Thiếu dấu phẩy ở đây
                "}]" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/registrations/create")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void addNewRegisWithOutFiles() throws Exception {
        UserDetails userDetails = new User("0344193909", "123456", new ArrayList<>());
        String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{" +
                "\"customerInfo\":{" +
                "\"id\":\"657d8946c349fe4049fb7c8b\"," + // Dấu phẩy sau mỗi khóa/giá trị
                "\"name\":\"John Doe\"," +
                "\"email\":\"johndoe@example.com\"" + // Không cần dấu phẩy ở cuối đối tượng, nhưng cần trước "productInfo"
                "}," +
                "\"productInfo\":{" +
                "\"planId\":\"65acede0a680637ecb9af06c\"," + // Dấu phẩy sau mỗi khóa/giá trị
                "\"name\":\"Health Insurance\"," + // Thiếu dấu phẩy ở đây
                "\"planType\":[{" +
                "\"typeName\":\"Premium\"," + // Thiếu dấu phẩy ở đây và sau mỗi khóa/giá trị
                "\"totalBenefits\":1000000," +
                "\"benefits\":[{" +
                "\"benefitName\":\"Hospitalization\"," +
                "\"dependencies\":\"Age\"," +
                "\"feeType\":[{" +
                "\"type\":\"ageBased\"," +
                "\"startAge\":18," +
                "\"endAge\":65," +
                "\"fee\":200" + // Thiếu dấu phẩy ở đây
                "}]," +
                "\"unit\":\"VND\"," +
                "\"insuranceAmount\":\"100000\"" + // Thiếu dấu phẩy ở đây
                "}]" +
                "}]," +
                "}," +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/registrations/create")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    public void addNewRegisWithOutLogin() throws Exception {
        //UserDetails userDetails = new User("0344193909", "123456", new ArrayList<>());
        //String jwtToken = jwtService.generateToken(new HashMap<>(), userDetails);
        String requestBody = "{" +
                "\"customerInfo\":{" +
                "\"id\":\"657d8946c349fe4049fb7c8b\"," + // Dấu phẩy sau mỗi khóa/giá trị
                "\"name\":\"John Doe\"," +
                "\"email\":\"johndoe@example.com\"" + // Không cần dấu phẩy ở cuối đối tượng, nhưng cần trước "productInfo"
                "}," +
                "\"productInfo\":{" +
                "\"planId\":\"65acede0a680637ecb9af06c\"," + // Dấu phẩy sau mỗi khóa/giá trị
                "\"name\":\"Health Insurance\"," + // Thiếu dấu phẩy ở đây
                "\"planType\":[{" +
                "\"typeName\":\"Premium\"," + // Thiếu dấu phẩy ở đây và sau mỗi khóa/giá trị
                "\"totalBenefits\":1000000," +
                "\"benefits\":[{" +
                "\"benefitName\":\"Hospitalization\"," +
                "\"dependencies\":\"Age\"," +
                "\"feeType\":[{" +
                "\"type\":\"ageBased\"," +
                "\"startAge\":18," +
                "\"endAge\":65," +
                "\"fee\":200" + // Thiếu dấu phẩy ở đây
                "}]," +
                "\"unit\":\"VND\"," +
                "\"insuranceAmount\":\"100000\"" + // Thiếu dấu phẩy ở đây
                "}]" +
                "}]," +
                "}," +
                "\"documentUrls\":[{" +
                "\"url\":\"http://example.com/doc1\"" + // Thiếu dấu phẩy ở đây
                "}]" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/registrations/create")
                        //.header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}

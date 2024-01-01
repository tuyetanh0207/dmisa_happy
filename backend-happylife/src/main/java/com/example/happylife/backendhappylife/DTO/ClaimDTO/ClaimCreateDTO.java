package com.example.happylife.backendhappylife.DTO.ClaimDTO;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClaimCreateDTO {
    private RegisResDTO regisInfo;
    private String status;
    private List<String> claimCategories;
    private Integer claimRequest;
    private Integer claimAmount;
    private Integer content;
    private String rejectReason;
    private List<String> claimURL;
}

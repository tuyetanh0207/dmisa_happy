package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Claim")
public class Claim {
    @Id
    private ObjectId claimId;

    @Column(nullable = false)
    private RegisResDTO regisInfo;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String typeOfExpense;

    @Column(nullable = false)
    private Integer claimRequest;
    @Column(nullable = false)
    private Integer claimAmount;

    private Integer content;

    private String rejectReason;

    private List<String> claimURL;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant approvalDate;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant createdAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant updatedAt;


}

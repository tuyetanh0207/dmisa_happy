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

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Contract")
public class Contract {
    @Id
    private ObjectId contractId;
    @Column(nullable = false)
    private RegisResDTO regisInfo;
    @Column(nullable = false)

    private String status;
    @Column(nullable = false)
    private Boolean confirmation;
    @Field(targetType = FieldType.DATE_TIME)
    private Instant planCreatedAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant planUpdatedAt;
}

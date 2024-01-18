package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
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
    private Instant CreatedAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant UpdatedAt;

    public Contract convertResToContract(ContractResDTO dto) {
        Contract contract = new Contract();
        if(dto.getContractId() != null){
            ObjectId dtoId = new ObjectId(dto.getContractId());
            contract.setContractId(dtoId);
        }
        contract.setConfirmation(dto.getConfirmation());
        contract.setStatus(dto.getStatus());
        contract.setRegisInfo(dto.getRegisInfo());
        return contract;
    }
    public ContractResDTO convertToContractResDTO() {
        ContractResDTO dto = new ContractResDTO();
        dto.setContractId(this.contractId.toString());
        dto.setConfirmation(this.confirmation);
        dto.setStatus(this.status);
        dto.setRegisInfo(this.regisInfo);
        return dto;
    }
}
package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractCreateDTO;
import com.example.happylife.backendhappylife.DTO.ContractDTO.ContractResDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
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
    private Instant createdAt;

    private List<String> content;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant updatedAt;

    public Contract convertResToContract(ContractResDTO dto) {
        Contract contract = new Contract();
        if(dto.getContractId() != null){
            ObjectId dtoId = new ObjectId(dto.getContractId());
            contract.setContractId(dtoId);
        }
        contract.setConfirmation(dto.getConfirmation());
        contract.setStatus(dto.getStatus());
        contract.setRegisInfo(dto.getRegisInfo());
        contract.setContent(dto.getContent());
        contract.setCreatedAt(dto.getCreatedAt());
        return contract;
    }
    public Contract convertCreToContract(ContractCreateDTO dto) {
        Contract contract = new Contract();
        contract.setConfirmation(dto.getConfirmation());
        contract.setStatus(dto.getStatus());
        contract.setRegisInfo(dto.getRegisInfo());
        contract.setContent(dto.getContent());
        return contract;
    }
    public ContractResDTO convertToContractResDTO() {
        ContractResDTO dto = new ContractResDTO();
        dto.setContractId(this.contractId.toString());
        dto.setConfirmation(this.confirmation);
        dto.setStatus(this.status);
        dto.setRegisInfo(this.regisInfo);
        dto.setContent(this.content);
        dto.setCreatedAt(this.createdAt);
        return dto;
    }
    public ContractCreateDTO convertToContractCreDTO() {
        ContractCreateDTO dto = new ContractCreateDTO();

        dto.setConfirmation(this.confirmation);
        dto.setStatus(this.status);
        dto.setRegisInfo(this.regisInfo);
        dto.setContent(this.content);
        return dto;
    }
}

package com.example.happylife.backendhappylife.DTO.ContractDTO;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
import java.util.List;

@Getter
public class ContractResDTO {
    private String contractId;
    private RegisResDTO regisInfo;
    private String status;
    private Boolean confirmation;
    private List<String> content;
    @Field(targetType = FieldType.DATE_TIME)
    private Instant createdAt;
    public void setContent(List<String> content) {this.content = content;}

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public void setRegisInfo(RegisResDTO regisInfo) {
        this.regisInfo = regisInfo;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setConfirmation(Boolean confirmation) {
        this.confirmation = confirmation;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}

package com.example.happylife.backendhappylife.DTO.ContractDTO;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import lombok.Getter;

@Getter
public class ContractResDTO {
    private String contractId;
    private RegisResDTO regisInfo;
    private String status;
    private Boolean confirmation;

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
}

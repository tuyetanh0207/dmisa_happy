package com.example.happylife.backendhappylife.DTO.InvoiceDTO;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Enum.InvoiceType;
import lombok.Data;

import java.time.Instant;

@Data
public class InvoiceUpdateDTO {
    private String invoiceId;

    private InvoiceType invoiceType;
    private RegisResDTO regisInfo;

    private ClaimResDTO claimInfo;
    private String paymentStatus;
    private String paymentMethod;

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public InvoiceType getInvoiceType() {
        return invoiceType;
    }

    public void setInvoiceType(InvoiceType invoiceType) {
        this.invoiceType = invoiceType;
    }

    public RegisResDTO getRegisInfo() {
        return regisInfo;
    }

    public ClaimResDTO getClaimInfo() {
        return claimInfo;
    }

    public void setClaimInfo(ClaimResDTO claimInfo) {
        this.claimInfo = claimInfo;
    }

    public void setRegisInfo(RegisResDTO regisInfo) {
        this.regisInfo = regisInfo;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}

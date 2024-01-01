package com.example.happylife.backendhappylife.DTO.InvoiceDTO;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;

import java.time.Instant;

public class InvoiceUpdateDTO {
    private String invoiceId;
    private RegisResDTO regisInfo; // ID của đăng ký
    private String paymentStatus;
    private String paymentMethod;

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public RegisResDTO getRegisInfo() {
        return regisInfo;
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

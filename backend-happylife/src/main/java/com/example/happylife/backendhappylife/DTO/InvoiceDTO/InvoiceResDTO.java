package com.example.happylife.backendhappylife.DTO.InvoiceDTO;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Claim;
import jakarta.persistence.Column;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
@Getter
public class InvoiceResDTO {
    private String invoiceId;
    private String invoiceType;
    private RegisResDTO regisInfo;
    private ClaimResDTO claimInfo;
    private Integer totalPrice;
    private String paymentStatus;
    private String paymentMethod;
    private Instant dueDate;
    private Instant createdAt;
    private Instant updatedAt;

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public void setRegisInfo(RegisResDTO regisInfo) {
        this.regisInfo = regisInfo;
    }

    public String getInvoiceType() {
        return invoiceType;
    }

    public void setInvoiceType(String invoiceType) {
        this.invoiceType = invoiceType;
    }
    public ClaimResDTO getClaimInfo() {
        return claimInfo;
    }

    public void setClaimInfo(ClaimResDTO claimInfo) {
        this.claimInfo = claimInfo;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}

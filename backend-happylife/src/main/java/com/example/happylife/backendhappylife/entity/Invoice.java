package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceUpdateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Enum.DateUnit;
import com.example.happylife.backendhappylife.entity.Enum.InvoiceType;
import com.example.happylife.backendhappylife.repo.InvoiceRepo;
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
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Invoice")
public class Invoice {
    @Id
    private ObjectId invoiceId;

    private RegisResDTO regisInfo;

    private ClaimResDTO claimInfo;

    private InvoiceType invoiceType;

    @Column(nullable = false)
    private Integer totalPrice;

    @Column(nullable = false)
    private String paymentStatus;

    private String paymentMethod;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant dueDate;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant createdAt;

    @Field(targetType = FieldType.DATE_TIME)
    private Instant updatedAt;

    public InvoiceUpdateDTO convertToInvoiceUpdateDTO() {
        InvoiceUpdateDTO dto = new InvoiceUpdateDTO();
        dto.setInvoiceId(this.getInvoiceId().toString());
        dto.setRegisInfo(this.getRegisInfo());

        dto.setPaymentStatus(this.getPaymentStatus());
        dto.setPaymentMethod(this.getPaymentMethod());

        return dto;
    }
    public Invoice convertCreToInvoice(InvoiceCreateDTO invoiceCreateDTO) {
        Invoice invoice = new Invoice();
        invoice.setRegisInfo(invoiceCreateDTO.getRegisInfo());
        invoice.setPaymentStatus(invoiceCreateDTO.getPaymentStatus());
        invoice.setPaymentMethod(invoiceCreateDTO.getPaymentMethod());
        invoice.setDueDate(invoiceCreateDTO.getDueDate());
        invoice.setTotalPrice(invoiceCreateDTO.getTotalPrice());
        return invoice;
    }
    public Invoice convertUpdToInvoice(InvoiceUpdateDTO dto) {
        Invoice invoice = new Invoice();
        if(dto.getInvoiceId() != null){
            ObjectId dtoId = new ObjectId(dto.getInvoiceId());
            invoice.setInvoiceId(dtoId);
        }
        invoice.setRegisInfo(dto.getRegisInfo());
        invoice.setPaymentStatus(dto.getPaymentStatus());
        invoice.setPaymentMethod(dto.getPaymentMethod());
        return invoice;
    }
    public Invoice convertResToInvoice(InvoiceResDTO dto) {
        Invoice invoice = new Invoice();
        if(dto.getInvoiceId() != null){
            ObjectId dtoId = new ObjectId(dto.getInvoiceId());
            invoice.setInvoiceId(dtoId);
        }
        invoice.setRegisInfo(dto.getRegisInfo());
        invoice.setUpdatedAt(dto.getUpdatedAt());
        invoice.setCreatedAt(dto.getCreatedAt());
        invoice.setTotalPrice(dto.getTotalPrice());
        invoice.setDueDate(dto.getDueDate());
        invoice.setPaymentStatus(dto.getPaymentStatus());
        invoice.setPaymentMethod(dto.getPaymentMethod());
        return invoice;
    }
    public InvoiceResDTO convertToInvoiceResDTO() {
        InvoiceResDTO dto = new InvoiceResDTO();
        dto.setInvoiceId(this.invoiceId.toString());
        dto.setRegisInfo(this.regisInfo);
        dto.setPaymentStatus(this.paymentStatus);
        dto.setPaymentMethod(this.paymentMethod);
        dto.setCreatedAt(this.createdAt);
        dto.setDueDate(this.dueDate);
        dto.setTotalPrice(this.totalPrice);
        dto.setUpdatedAt(this.updatedAt);
        return dto;
    }
}

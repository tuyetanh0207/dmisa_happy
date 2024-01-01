package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceUpdateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.entity.Enum.DateUnit;
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

    @Column(nullable = false)
    private RegisResDTO regisInfo;

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
}

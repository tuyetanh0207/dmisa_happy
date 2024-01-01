package com.example.happylife.backendhappylife.DTO.InvoiceDTO;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceCreateDTO {
    private RegisResDTO regisInfo; // ID của đăng ký
    private Integer totalPrice; // Tổng giá trị
    private String paymentStatus;
    private String paymentMethod; // Phương thức thanh toán
    private Instant dueDate; // Ngày đáo hạn

    public RegisResDTO getRegisInfo() {
        return regisInfo;
    }

    public void setRegisInfo(RegisResDTO regisInfo) {
        this.regisInfo = regisInfo;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
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

    public Instant getDueDate() {
        return dueDate;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }
}
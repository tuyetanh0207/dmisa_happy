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
}
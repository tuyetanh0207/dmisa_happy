package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Invoice;
import org.bson.types.ObjectId;

public interface InvoiceService {
    Invoice addInvoice(Invoice invoice);

    Invoice updateInvoice(UserResDTO authUser, ObjectId invoiceId, Invoice invoice);
}

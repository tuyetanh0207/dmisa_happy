package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceCreateDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceUpdateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Invoice;
import org.bson.types.ObjectId;

import java.util.List;

public interface InvoiceService {
    InvoiceResDTO addInvoice(InvoiceCreateDTO invoice);

    //Service for Customer
    List<InvoiceResDTO> getInvoiceofUserById(UserResDTO userVar, ObjectId userId);

    //Service for Customer
    InvoiceResDTO getInvoiceByRegisId(UserResDTO userVar, ObjectId regisId);

    //Service for Customer
    InvoiceUpdateDTO updateInvoice(UserResDTO user, ObjectId invoiceId, InvoiceUpdateDTO invoiceUpd);
}

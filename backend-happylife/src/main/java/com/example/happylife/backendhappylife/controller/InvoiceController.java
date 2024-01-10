package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceUpdateDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanUpdateDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Invoice;
import com.example.happylife.backendhappylife.entity.Plan;
import com.example.happylife.backendhappylife.entity.User;
import com.example.happylife.backendhappylife.service.InvoiceService;
import com.example.happylife.backendhappylife.service.PlanService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})

@RestController
@RequestMapping("/api/v1/invoices")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;
    @PutMapping("/{invoiceId}/Cash")
    public ResponseEntity<InvoiceUpdateDTO> updateInvoice(HttpServletRequest request,
                                                          @PathVariable ObjectId invoiceId,
                                                          @RequestBody InvoiceUpdateDTO invoiceUpdateDTO) {
        User userVar = (User) request.getAttribute("userDetails");
        UserResDTO user = userVar.convertFromUserToUserResDTO();

        Invoice invoice = new Invoice();
        Invoice invoiceUpdated = invoice.convertUpdToInvoice(invoiceUpdateDTO);
        Invoice savedInvoice = invoiceService.updateInvoice(user,invoiceId,invoiceUpdated);
        InvoiceUpdateDTO invoiceUpdDTO = savedInvoice.convertToInvoiceUpdateDTO();
        return ResponseEntity.ok(invoiceUpdDTO);
    };
}

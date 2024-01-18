package com.example.happylife.backendhappylife.repo;

import com.example.happylife.backendhappylife.entity.Invoice;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepo extends MongoRepository<Invoice, ObjectId> {
    Optional<Invoice> findByRegisInfo_RegisId(String regisId);
    List<Invoice> findByRegisInfo_CustomerInfo_Id(String userId);
}

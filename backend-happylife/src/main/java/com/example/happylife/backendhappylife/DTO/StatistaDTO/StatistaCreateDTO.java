package com.example.happylife.backendhappylife.DTO.StatistaDTO;

import com.example.happylife.backendhappylife.entity.Statista;
import jakarta.persistence.Column;
import lombok.Data;
import org.bson.types.ObjectId;

import java.util.List;

@Data
public class StatistaCreateDTO {

    private Integer year;
    private Statista.InsuranceStatista insuranceStatista;
    private Statista.ClaimStatista claimStatista;
    private Statista.AvenueStatista avenueStatista;
    private Statista.RateStatista rateStatista;
    private List<Statista.MonthStatista> monthStatistas;
}

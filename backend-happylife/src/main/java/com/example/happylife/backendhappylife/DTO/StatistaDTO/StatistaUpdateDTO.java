package com.example.happylife.backendhappylife.DTO.StatistaDTO;

import com.example.happylife.backendhappylife.entity.Statista;
import jakarta.persistence.Column;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
public class StatistaUpdateDTO  {
    @Field
    private Statista.InsuranceStatista insuranceStatista;

    @Field
    private Statista.ClaimStatista claimStatista;

    @Field
    private Statista.AvenueStatista avenueStatista;

    @Field
    private Statista.RateStatista rateStatista;

   @Field
    private List<Statista.MonthStatista> monthStatistas;
}

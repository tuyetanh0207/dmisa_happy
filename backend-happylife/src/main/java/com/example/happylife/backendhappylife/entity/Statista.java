package com.example.happylife.backendhappylife.entity;

import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaCreateDTO;
import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaDashboardResDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection="Statista")
public class Statista {
    @Id
    private ObjectId statistaId;
    @Field(name = "year")
    private Integer year;
    @Field(name = "insuranceStatista")
    private InsuranceStatista insuranceStatista;
    @Field(name = "claimStatista")
    private ClaimStatista claimStatista;
    @Field(name = "avenueStatista")
    private AvenueStatista avenueStatista;
    @Field(name = "rateStatista")
    private RateStatista rateStatista;
    @Field(name = "monthStatistas")
    private List<MonthStatista> monthStatistas;

    @Data
    public static class InsuranceStatista {
        private Float numOfInsuranceRegistration;
        private Float numOfExpiredRegistration;
        private Float numOfActiveRegistration;
    }

    @Data
    public static class ClaimStatista {
        private Float numOfClaim;
        private Float numOfResolvedClaim;
        private Float numOfPendingClaim;
        private Float totalClaimAmount;
    }

    @Data
    public static class AvenueStatista {
        private Float totalAvenueFromInsuranceFee;
        private Float totalProfit;
    }

    @Data
    public static class RateStatista {
        private Float lossRatio;
        private Float compensationPayoutRatio;
        private List<RateOfPlan> rateOfPlans;
    }

    @Data
    public static class RateOfPlan {
        private String planId;
        private String planName;
        private Float lossRatio;
        private Float compensationPayoutRatio;
    }

    @Data
    public static class MonthStatista {
        private Integer month;
        private InsuranceStatista insuranceStatista;
        private ClaimStatista claimStatista;
        private AvenueStatista avenueStatista;
        private RateStatista rateStatista;
    }

    public StatistaDashboardResDTO convertToDashboardResDTO(){
        StatistaDashboardResDTO statistaDashboardResDTO = new StatistaDashboardResDTO();
        statistaDashboardResDTO.setStatistaId(this.statistaId.toString());
        statistaDashboardResDTO.setYear(this.year);
        statistaDashboardResDTO.setAvenueStatista(this.avenueStatista);
        statistaDashboardResDTO.setClaimStatista(this.claimStatista);
        statistaDashboardResDTO.setInsuranceStatista(this.insuranceStatista);
        statistaDashboardResDTO.setMonthStatistas(this.monthStatistas);
        statistaDashboardResDTO.setRateStatista(this.rateStatista);
        return statistaDashboardResDTO;
    }
    public Statista convertCreToEntity(StatistaCreateDTO dto){
        this.insuranceStatista = dto.getInsuranceStatista();
        this.year = dto.getYear();
        this.avenueStatista = dto.getAvenueStatista();
        this.claimStatista= dto.getClaimStatista();
        this.monthStatistas = dto.getMonthStatistas();
        this.rateStatista = dto.getRateStatista();
        return this;
    }




}

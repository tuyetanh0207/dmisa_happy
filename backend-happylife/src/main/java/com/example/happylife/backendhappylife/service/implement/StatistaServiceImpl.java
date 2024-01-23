package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaCreateDTO;
import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaDashboardResDTO;
import com.example.happylife.backendhappylife.entity.Statista;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.StatistaRepo;
import com.example.happylife.backendhappylife.service.StatistaService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.Arrays;
import java.util.List;

@Service
public class StatistaServiceImpl implements StatistaService {

    @Autowired
    private StatistaRepo statistaRepo;
    @Override
    public StatistaDashboardResDTO getStatistaInDashboardByYear(Integer year) {
        StatistaDashboardResDTO statistaDashboardResDTO;
        Statista statista;

        try {
            if(year!=null) statista = statistaRepo.findByYear(year);
            else {
                Year currentYear = Year.now();

                statista = statistaRepo.findByYear(currentYear.getValue());
            }
            return statista.convertToDashboardResDTO();

        } catch (Exception e) {
            throw new RuntimeException("Error find Statista of this year.");
        }
    }

    @Override
    public StatistaDashboardResDTO createStatista(StatistaCreateDTO statistaCreateDTO) {
        Statista statista = new Statista().convertCreToEntity(statistaCreateDTO);
        if(statistaCreateDTO.getYear()== null) {
            throw new UserCreationException("Year is required");
        }
        return statistaRepo.save(statista).convertToDashboardResDTO();
    }



    @Override
    public void updateStatistaByNewClaim(ClaimResDTO claimResDTO) {

        Integer year = Year.now().getValue();
        Integer indexMonth = LocalDate.now().getMonthValue() - 1;

        statistaRepo.incrementNumOfClaim(year,indexMonth);
        statistaRepo.incrementNumOfPendingClaim(year, indexMonth);

    }

    @Override
    public void updateStatistaByResolvedRegistration(RegisResDTO regisResDTO) {
        try {
            Integer year = Year.now().getValue();
            Integer indexMonth = LocalDate.now().getMonthValue() - 1;
            System.out.println(indexMonth);
            if (regisResDTO.getApprovalStatus().equals("Approved")) {
                /**
                 * rateStatista.lossRatio
                 * rateStatista.compensationPayoutRatio
                 *
                 *
                 * rateOfPlans:[planId]
                 * rateOfPlans:[planId].lossRatio
                 * rateOfPlans:[planId].compensationPayoutRatio
                 */
                statistaRepo.incrementNumOfInsuranceRegistration(year,indexMonth);
                statistaRepo.incrementNumOfActiveRegistration(year, indexMonth);

                statistaRepo.incrementTotalAvenueFromInsuranceFee(year, indexMonth, regisResDTO.getTotalFee());
                statistaRepo.incrementTotalProfit(year, indexMonth, regisResDTO.getTotalFee());
            }
            if (regisResDTO.getApprovalStatus().equals("Revoked")) {
                statistaRepo.incrementNumOfExpiredRegistration(year, indexMonth);
                statistaRepo.decreaseNumOfActiveRegistration(year, indexMonth);
            }



        }catch (Exception e) {
            throw new RuntimeException("Error find Statista of this year." + e.getMessage());
        }
    }
    @Override
    public void updateStatistaByResolvedClaim(ClaimResDTO claimResDTO) {
        Integer year = Year.now().getValue();
        Integer indexMonth = LocalDate.now().getMonthValue() - 1;

        String status = claimResDTO.getStatus();
        if (status.equals("Approved")) {
            /*
            rateStatista.lossRatio
            rateStatista.compensationPayoutRatio
*/
            if(claimResDTO.getClaimAmount()!=null){
                statistaRepo.incrementNumOfResolvedClaim(year, indexMonth);
                statistaRepo.incrementTotalClaimAmount(year, indexMonth, claimResDTO.getClaimAmount());
                statistaRepo.incrementTotalProfit(year, indexMonth, -claimResDTO.getClaimAmount());
            }


        }
    }
}

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
        Integer month = LocalDate.now().getMonthValue();
        Statista statista = statistaRepo.findByYear(year);

        statistaRepo.incrementNumOfClaim(year,month);
        statistaRepo.incrementNumOfPendingClaim(year, month);

    }

    @Override
    public void updateStatistaByResolvedRegistration(RegisResDTO regisResDTO) {
        try {
            Integer year = Year.now().getValue();
            Integer month = LocalDate.now().getMonthValue();
            Statista statista = statistaRepo.findByYear(year);
            System.out.println(month);
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
                List<Object> arrayFilters = Arrays.asList(Document.parse("{\"elem\": " + month + "}"));
                statistaRepo.incrementNumOfInsuranceRegistration(year, month, arrayFilters);
//                statistaRepo.incrementNumOfActiveRegistration(year, month);
//
//                statistaRepo.incrementTotalAvenueFromInsuranceFee(year, month, regisResDTO.getTotalFee());
//                statistaRepo.incrementTotalProfit(year, month, regisResDTO.getTotalFee());
            }
            if (regisResDTO.getApprovalStatus().equals("Revoked")) {
//                statistaRepo.incrementNumOfExpiredRegistration(year, month);
//                statistaRepo.decreaseNumOfActiveRegistration(year, month);
            }



        }catch (Exception e) {
            throw new RuntimeException("Error find Statista of this year." + e.getMessage());
        }
    }
    @Override
    public void updateStatistaByResolvedClaim(ClaimResDTO claimResDTO) {
        Integer year = Year.now().getValue();
        Integer month = LocalDate.now().getMonthValue();

        String status = claimResDTO.getStatus();
        if (status.equals("Approved")) {
            /*
            rateStatista.lossRatio
            rateStatista.compensationPayoutRatio
*/
            statistaRepo.incrementNumOfResolvedClaim(year, month);
            statistaRepo.incrementTotalClaimAmount(year, month, claimResDTO.getClaimAmount());
            statistaRepo.incrementTotalProfit(year, month, -claimResDTO.getClaimAmount());

        }
    }
}

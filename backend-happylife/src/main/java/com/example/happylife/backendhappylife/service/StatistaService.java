package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.ClaimDTO.ClaimResDTO;
import com.example.happylife.backendhappylife.DTO.InvoiceDTO.InvoiceResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaCreateDTO;
import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaDashboardResDTO;

public interface StatistaService {

    public StatistaDashboardResDTO getStatistaInDashboardByYear(Integer year);

    public StatistaDashboardResDTO createStatista(StatistaCreateDTO statistaCreateDTO);

    public StatistaDashboardResDTO updateStatistaByNewRegistration(RegisResDTO regisResDTO);

    public StatistaDashboardResDTO updateStatistaByNewClaim(ClaimResDTO claimResDTO);

    public StatistaDashboardResDTO updateStatistaByResolvedRegistration(RegisResDTO regisResDTO);

    public StatistaDashboardResDTO updateStatistaByResolvedClaim(ClaimResDTO claimResDTO);

}

package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaCreateDTO;
import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaDashboardResDTO;

public interface StatistaService {

    public StatistaDashboardResDTO getStatistaInDashboardByYear(Integer year);

    public StatistaDashboardResDTO createStatista(StatistaCreateDTO statistaCreateDTO);


}

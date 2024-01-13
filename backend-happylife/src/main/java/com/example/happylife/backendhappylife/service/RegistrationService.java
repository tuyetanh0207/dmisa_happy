package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisUpdateStatusDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Registration;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RegistrationService {
    public List<Registration> getRegistrations(UserResDTO user);

    Registration addRegistration(UserResDTO authUser, Registration regis);

    Registration updateRegisStatus(UserResDTO authUser, ObjectId regisId, RegisUpdateStatusDTO regisUpdateStatusDTO);

    List<RegisResDTO> getEnrollOfPlan(UserResDTO authUser, ObjectId planId, List<String> approvalStatusList);

    List<RegisResDTO> getAllRegistrationOfOnePlan(UserResDTO authUser, ObjectId planId);
}

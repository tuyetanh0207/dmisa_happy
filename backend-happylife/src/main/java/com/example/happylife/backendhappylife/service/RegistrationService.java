package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisUpdateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisUpdateStatusDTO;
import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Object.SectionFileCount;
import com.example.happylife.backendhappylife.entity.Registration;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RegistrationService {
    public List<Registration> getRegistrations(UserResDTO user);

    Registration updateRegisStatus(UserResDTO authUser, ObjectId regisId, RegisUpdateStatusDTO regisUpdateStatusDTO);

    List<RegisResDTO> getEnrollOfPlan(UserResDTO authUser, ObjectId planId, List<String> approvalStatusList);

    List<RegisResDTO> getAllRegistrationOfOnePlan(UserResDTO authUser, ObjectId planId);
    //Service for Customer
    RegisResDTO getRegisByIdRegis(UserResDTO userVar, ObjectId regisId);

    RegisResDTO getRegisByIdRegisForEvent(ObjectId regisId);

    RegisResDTO updateRegisStatusOfCustomer(ObjectId regisId, RegisUpdateDTO regisUpdateDTO);

    RegisResDTO addRegistration(RegisCreateDTO regisCreateDTO);

    List<RegisResDTO> getRegisByUserId(UserResDTO userVar, ObjectId userId);

    //Service for upload file, image
    //RegisResDTO updateRegisImageDocUrl(ObjectId regisId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts);

    //Service for upload file, image
    RegisResDTO updateRegisImageOrFileDocUrl(ObjectId regisId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts);

    RegisResDTO updateRegisFileDocUrl(ObjectId regisId, List<String> uploadedUrls, List<SectionFileCount> sectionFileCounts);

    RegisResDTO getRegisByPlanId(ObjectId planId);
}

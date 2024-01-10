package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.UserDTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Registration;
import org.bson.types.ObjectId;

import java.util.List;
public interface RegistrationService {
    public List<Registration> getRegistrations(UserResDTO user);

    Registration addRegistration(UserResDTO authUser, Registration regis);

    Registration updateRegisStatus(UserResDTO authUser, ObjectId regisId, Registration regis);
}

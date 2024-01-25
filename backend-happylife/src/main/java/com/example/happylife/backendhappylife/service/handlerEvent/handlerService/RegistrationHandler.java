package com.example.happylife.backendhappylife.service.handlerEvent.handlerService;

import com.example.happylife.backendhappylife.entity.Registration;
import com.example.happylife.backendhappylife.service.RegistrationService;
import com.example.happylife.backendhappylife.service.handlerEvent.classEvent.RegistrationEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RegistrationHandler {
    @Autowired
    private RegistrationService registrationService;
    @EventListener (condition = "#event.method.toString() == 'updateStatus'")
    public void onRegistrationStatusUpdated(RegistrationEvent event) {
        registrationService.updateRegisStatusOfCustomer(event.getRegistration().getRegisId(), event.getRegistration().convertToRegisUpdateDTO());
    }
    @EventListener (condition = "#event.method.toString() == 'getPlanWithRegisId'")
    public void onRegistrationGet(RegistrationEvent event) {
        Registration existingRegis = new Registration().convertToRegis(registrationService.getRegisByIdRegisForEvent(event.getRegistration().getRegisId()));
        //if(event.getCallback() != null){event.getCallback().onRegistrationRetrieved(existingRegis);}
        event.getCallback().onRegistrationRetrieved(existingRegis);
    }
}

package com.example.happylife.backendhappylife.service.handlerEvent.handlerService;

import com.example.happylife.backendhappylife.service.RegistrationService;
import com.example.happylife.backendhappylife.service.handlerEvent.classEvent.RegistrationEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RegistrationHandler {
    @Autowired
    private RegistrationService registrationService;
    @EventListener
    public void onRegistrationStatusUpdated(RegistrationEvent event) {
        registrationService.updateRegisStatusOfCustomer(event.getRegistration().getRegisId(), event.getRegistration().convertToRegisUpdateDTO());
    }
}

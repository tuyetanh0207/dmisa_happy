package com.example.happylife.backendhappylife.service.handlerEvent.classEvent;

import com.example.happylife.backendhappylife.entity.Registration;

public class RegistrationEvent {
    private final Registration registration;

    public RegistrationEvent(Registration registration) {
        this.registration = registration;
    }
    public Registration getRegistration() {
        return registration;
    }
}

package com.example.happylife.backendhappylife.service.handlerEvent.classEvent;

import com.example.happylife.backendhappylife.entity.Enum.RegistrationEventEnum;
import com.example.happylife.backendhappylife.entity.Registration;
import lombok.Getter;
import org.bson.types.ObjectId;

@Getter
public class RegistrationEvent {
    private final Registration registration;
    private ObjectId planId;
    private RegistrationEventEnum method;
    private RegistrationGetCallback callback;
    public interface RegistrationGetCallback {
        void onRegistrationRetrieved(Registration registration);
    }
    //private Registration regisGet;
    public RegistrationEvent(Registration registration, RegistrationEventEnum method) {
        this.registration = registration;
        this.method = method;
    }
    public RegistrationEvent(Registration registration,
                             ObjectId planId,
                             RegistrationEventEnum method,
                             RegistrationGetCallback callback) {
        this.registration = registration;
        this.planId = planId;
        this.method = method;
        this.callback = callback;
    }
}

package com.example.happylife.backendhappylife.service.handlerEvent.handlerService;

import com.example.happylife.backendhappylife.service.NotificationService;
import com.example.happylife.backendhappylife.service.handlerEvent.classEvent.NotificationEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationHandler {
    @Autowired
    private NotificationService notificationService;

    @EventListener
    public void onNotificationCreated(NotificationEvent event) {
        System.out.println("Id event : " + event.getNotificationEvent());

        notificationService.addNotiAuto(event.getNotificationEvent().convertToNotificationResDTO());
    }
}

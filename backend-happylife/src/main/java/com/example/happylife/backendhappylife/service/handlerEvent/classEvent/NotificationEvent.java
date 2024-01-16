package com.example.happylife.backendhappylife.service.handlerEvent.classEvent;

import com.example.happylife.backendhappylife.entity.Notification;

public class NotificationEvent {
    private final Notification notification;

    public NotificationEvent(Notification notification) {
        this.notification = notification;
    }
    public Notification getNotificationEvent() {
        return notification;
    }
}

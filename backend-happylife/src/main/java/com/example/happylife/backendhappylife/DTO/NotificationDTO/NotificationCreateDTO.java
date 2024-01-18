package com.example.happylife.backendhappylife.DTO.NotificationDTO;

import lombok.Getter;
import org.bson.types.ObjectId;

import java.time.Instant;

@Getter
public class NotificationCreateDTO {

    private ObjectId userInfo;
    private String notiTitle;
    private String notiContent;
    private Boolean notiStatus;
    private String notiType;
    private String notiPrio;


    public void setUserInfo(ObjectId userInfo) {
        this.userInfo = userInfo;
    }

    public void setNotiTitle(String notiTitle) {
        this.notiTitle = notiTitle;
    }

    public void setNotiContent(String notiContent) {
        this.notiContent = notiContent;
    }

    public void setNotiStatus(Boolean notiStatus) {
        this.notiStatus = notiStatus;
    }

    public void setNotiType(String notiType) {
        this.notiType = notiType;
    }

    public void setNotiPrio(String notiPrio) {
        this.notiPrio = notiPrio;
    }


}

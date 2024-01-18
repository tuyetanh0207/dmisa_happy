package com.example.happylife.backendhappylife.DTO.NotificationDTO;

import jakarta.persistence.Column;
import lombok.Getter;
import org.bson.types.ObjectId;

@Getter
public class NotificationCreateDTO {
    private String userInfo;
    private String notiTitle;
    private String notiContent;
    private Boolean notiStatus;
    private String notiType;
    private String notiPrio;

    public void setUserInfo(String userInfo) {
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

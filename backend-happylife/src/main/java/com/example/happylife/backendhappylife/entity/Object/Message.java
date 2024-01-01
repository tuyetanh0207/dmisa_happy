package com.example.happylife.backendhappylife.entity.Object;

import jakarta.persistence.Column;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.Instant;
@Getter
public class Message {
    @Field(targetType = FieldType.DATE_TIME)
    private Instant dateMessage;
    @Column(nullable = false)
    private String content;

    public void setDateMessage(Instant dateMessage) {
        this.dateMessage = dateMessage;
    }
    public void setContent(String content) {
        this.content = content;
    }
}

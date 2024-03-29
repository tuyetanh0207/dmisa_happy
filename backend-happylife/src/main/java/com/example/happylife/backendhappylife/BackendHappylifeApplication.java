package com.example.happylife.backendhappylife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class BackendHappylifeApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendHappylifeApplication.class, args);
    }

}

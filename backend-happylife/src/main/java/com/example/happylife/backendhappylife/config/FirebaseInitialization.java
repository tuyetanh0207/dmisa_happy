package com.example.happylife.backendhappylife.config;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Component
public class FirebaseInitialization {
    private static String jsonfile = "dmisa-410407-firebase-adminsdk-3rqdq-9e940c8506.json";
    private static String bucket = "dmisa-410407.appspot.com";

   @PostConstruct
   public void initialize() {
       try {
           FirebaseOptions options = new FirebaseOptions.Builder()
                   .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(jsonfile).getInputStream()))
                   .setStorageBucket(bucket)
                   .build();

           if (FirebaseApp.getApps().isEmpty()) {
               FirebaseApp.initializeApp(options);
           }
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }

}

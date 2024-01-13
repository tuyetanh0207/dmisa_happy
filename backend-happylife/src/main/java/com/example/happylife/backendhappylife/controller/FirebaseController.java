package com.example.happylife.backendhappylife.controller;

import com.example.happylife.backendhappylife.service.FireBaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})
@RestController
@RequestMapping("/api/v1/files")
public class FirebaseController {
    private final FireBaseService firebaseStorageService;

    @Autowired
    public FirebaseController(FireBaseService firebaseStorageService) {
        this.firebaseStorageService = firebaseStorageService;
    }

    @PostMapping("/upload/files")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        try {
            List<String> fileUrls = firebaseStorageService.uploadFiles(files);
            return ResponseEntity.ok(fileUrls);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @PostMapping("/upload/image")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("files") MultipartFile[] files) {
        try {
            List<String> fileUrls = firebaseStorageService.uploadImages(files);
            return ResponseEntity.ok(fileUrls);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}

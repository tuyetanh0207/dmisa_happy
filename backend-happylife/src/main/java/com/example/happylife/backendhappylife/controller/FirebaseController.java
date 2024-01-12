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
   /* @Autowired
    private FireBaseService firebaseStorageService;

 *//*   public FileController(FirebaseStorageService storageService) {
        this.storageService = storageService;
    }*//*

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = firebaseStorageService.uploadFile(file);
            return ResponseEntity.ok(fileName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }

   *//* @GetMapping("/download/{fileName}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String fileName) {
        try {
            byte[] content = storageService.downloadFile(fileName);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/pdf")
                    .header("Content-Disposition", "attachment; filename=" + fileName)
                    .body(content);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }*/
  /* @Autowired
   private final FireBaseService fireBaseService;
    public FirebaseController(FireBaseService fireBaseService) {
        this.fireBaseService = fireBaseService;
    }

    @PostMapping("/upload")
    public ResponseEntity<java.util.List<String>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        try {
            List<String> fileUrls = fireBaseService.uploadFiles(files);
            return ResponseEntity.ok(fileUrls);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }*/

    private final FireBaseService firebaseStorageService;

    @Autowired
    public FirebaseController(FireBaseService firebaseStorageService) {
        this.firebaseStorageService = firebaseStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        try {
            List<String> fileUrls = firebaseStorageService.uploadFiles(files);
            return ResponseEntity.ok(fileUrls);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}

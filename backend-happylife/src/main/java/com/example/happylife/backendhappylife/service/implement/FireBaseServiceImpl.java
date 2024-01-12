package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.service.FireBaseService;
import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FireBaseServiceImpl implements FireBaseService {
    private Storage storage;
    private String jsonfile = "dmisa-410407-firebase-adminsdk-3rqdq-9e940c8506.json";
    private String bucket = "dmisa-410407.appspot.com";

   /* public FirebaseStorageService() {
        this.storage = StorageOptions.getDefaultInstance().getService();
    }*/

  /*  public String uploadFile(MultipartFile multipartFile) throws IOException {
        String fileName = generateFileName(multipartFile.getOriginalFilename());
        BlobId blobId = BlobId.of(bucket, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("application/pdf").build();
        storage.create(blobInfo, multipartFile.getBytes());

        return fileName; // Return the filename to save it in database if needed
    }

    public byte[] downloadFile(String fileName) {
        Blob blob = storage.get(BlobId.of(bucket, fileName));
        return blob.getContent();
    }

    public String generateFileName(String originalFileName) {
        // Generate a unique file name using UUID or another method
        return UUID.randomUUID().toString() + "-" + originalFileName;
    }
*/
  /*public java.util.List<String> uploadFiles(MultipartFile[] files) throws IOException {
      java.util.List<String> fileUrls = new ArrayList<>();
      Storage storage = StorageClient.getInstance().bucket().getStorage();

      for (MultipartFile file : files) {
          String objectName = generateFileName(file.getOriginalFilename());
          Blob blob = storage.create(BlobInfo.newBuilder(bucket, objectName).build(), file.getBytes());
          fileUrls.add(blob.getMediaLink());
      }

      return fileUrls;
  }*/
  public java.util.List<String> uploadFiles(MultipartFile[] files) throws IOException {
      List<String> fileUrls = new ArrayList<>();
      Storage storage = StorageClient.getInstance().bucket().getStorage();

      for (MultipartFile file : files) {
          // Check if the file is not empty and is a PDF
          if (!file.isEmpty() && "application/pdf".equals(file.getContentType())) {
              String objectName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
              Blob blob = storage.create(BlobInfo.newBuilder(bucket, objectName).build(), file.getBytes());
              fileUrls.add(blob.getMediaLink());
          }
      }

      return fileUrls;
  }
  public String generateFileName(String originalFileName) {
      return UUID.randomUUID().toString() + "-" + originalFileName.replace(" ", "_");
  }
    /*public String uploadMultiFile(MultipartFile multipartFile){
        FileStor
    }*/
}

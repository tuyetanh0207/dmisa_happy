package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.service.FireBaseService;
import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.List;

@Service
public class FireBaseServiceImpl implements FireBaseService {
    private Storage storage;
    private String jsonfile = "dmisa-410407-firebase-adminsdk-3rqdq-9e940c8506.json";
    private String bucket = "dmisa-410407.appspot.com";


  public java.util.List<String> uploadFiles(MultipartFile[] files) throws IOException {

      //Present
      List<String> fileUrls = new ArrayList<>();
      // Lấy đối tượng Storage từ Firebase SDK
      Storage storage = StorageClient.getInstance().bucket().getStorage();

      for (MultipartFile file : files) {
          if (file.isEmpty() || !Objects.equals(file.getContentType(), "application/pdf")) {
              continue; // Bỏ qua nếu file rỗng hoặc không phải PDF
          }

          String objectName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

          BlobId blobId = BlobId.of(bucket, objectName);
          BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                  .setContentType("application/pdf") // Set the content-type to pdf
                  .setAcl(new ArrayList<>(Collections.singletonList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER)))) // Make the blob publicly accessible
                  .build();

          // Tạo blob trong bucket và lấy signed URL nếu cần
          Blob blob = storage.create(blobInfo, file.getBytes());

          // Lấy URL có thể truy cập công khai từ Firebase Storage
          String publicUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket + "/o/" + URLEncoder.encode(objectName, StandardCharsets.UTF_8) + "?alt=media";
          fileUrls.add(publicUrl);
      }

      return fileUrls;
  }

    public java.util.List<String> uploadImages(MultipartFile[] files) throws IOException {

        List<String> fileUrls = new ArrayList<>();
        Storage storage = StorageClient.getInstance().bucket().getStorage();

        for (MultipartFile file : files) {
            String objectName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
            BlobId blobId = BlobId.of(bucket, objectName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                    .setContentType(file.getContentType()) // Đặt theo loại nội dung của file
                    .setAcl(new ArrayList<>(Collections.singletonList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER)))) // Đặt quyền truy cập công khai
                    .build();

            // Tạo blob trong bucket
            Blob blob = storage.create(blobInfo, file.getInputStream().readAllBytes());

            // Lấy URL download từ Firebase
            String downloadUrl = "https://firebasestorage.googleapis.com/v0/b/"
                    + bucket
                    + "/o/"
                    + URLEncoder.encode(objectName, StandardCharsets.UTF_8.name())
                    + "?alt=media&token="
                    + blob.getGeneratedId(); // token có thể cần được tạo hoặc lấy từ một nguồn khác tùy thuộc vào cấu hình của bạn

            fileUrls.add(downloadUrl);
        }

        return fileUrls;
    }
  public String generateFileName(String originalFileName) {
      return UUID.randomUUID().toString() + "-" + originalFileName.replace(" ", "_");
  }
}

package com.example.happylife.backendhappylife.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FireBaseService {
    //public String uploadFile(MultipartFile multipartFile) throws IOException;
    public java.util.List<String> uploadFiles(MultipartFile[] files) throws IOException;

    //public byte[] downloadFile(String fileName);
    public String generateFileName(String originalFileName);
}

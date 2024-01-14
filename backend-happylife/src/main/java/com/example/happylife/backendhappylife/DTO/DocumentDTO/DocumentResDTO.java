package com.example.happylife.backendhappylife.DTO.DocumentDTO;

import jakarta.persistence.Column;
import lombok.Getter;

@Getter
public class DocumentResDTO {
    private String fileName;
    private String filetype;
    private byte[] filebyte;
    private String filebase64;
    private String fileUrl;

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFiletype(String filetype) {
        this.filetype = filetype;
    }

    public void setFilebyte(byte[] filebyte) {
        this.filebyte = filebyte;
    }

    public void setFilebase64(String filebase64) {
        this.filebase64 = filebase64;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}

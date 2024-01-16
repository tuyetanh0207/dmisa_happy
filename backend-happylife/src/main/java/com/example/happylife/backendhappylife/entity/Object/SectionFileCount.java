package com.example.happylife.backendhappylife.entity.Object;

import lombok.Getter;
@Getter
public class SectionFileCount {
    private String section;
    private int fileCount;

    public void setSection(String section) {
        this.section = section;
    }

    public void setFileCount(int fileCount) {
        this.fileCount = fileCount;
    }
}

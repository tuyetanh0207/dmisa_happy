package com.example.happylife.backendhappylife.service;
import java.util.regex.Pattern;
public class MyService {
    private static final String PHONE_NUMBER_REGEX="[0-9]+$";
    public static boolean isValidPhoneNumber(String phoneNumber){
        return phoneNumber!= null && Pattern.matches(PHONE_NUMBER_REGEX, phoneNumber);
    }
}

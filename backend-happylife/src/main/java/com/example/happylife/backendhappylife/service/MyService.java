package com.example.happylife.backendhappylife.service;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class MyService {
    private static final String PHONE_NUMBER_REGEX="[0-9]+$";
    private static final String EMAIL_PATTERN =
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

    private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN);


    public static boolean isValidPhoneNumber(String phoneNumber){
        return phoneNumber!= null && Pattern.matches(PHONE_NUMBER_REGEX, phoneNumber);
    }
    public static boolean isValidEmail(String email) {
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}

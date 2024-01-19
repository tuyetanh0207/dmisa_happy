package com.example.happylife.backendhappylife.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsFilterConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow all origins for simplicity; you might want to restrict this in production
        config.addAllowedOrigin("*");

        // Allow the necessary headers for file uploads and authorization
        config.addAllowedHeader("Access-Control-Allow-Origin");
        config.addAllowedHeader("Access-Control-Allow-Methods");
        config.addAllowedHeader("Access-Control-Allow-Headers");
        config.addAllowedHeader("Authorization");
        config.addAllowedHeader("Content-Type");

        // Allow credentials (e.g., cookies)
        config.setAllowCredentials(true);

        // Allow all HTTP methods
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

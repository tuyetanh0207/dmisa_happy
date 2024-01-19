package com.example.happylife.backendhappylife.config;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsConfig extends CorsFilter {

    public CorsConfig() {
        super(configurationSource());
    }

    private static UrlBasedCorsConfigurationSource configurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*"); // Allow all origins, you might want to restrict this in production
        config.addAllowedHeader("Content-Type");
        config.addAllowedHeader("Origin");
        config.addAllowedHeader("Authorization");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}

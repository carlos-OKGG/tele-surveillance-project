package com.backend.surveillance_app_backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {

    // Anyone can access this
    @GetMapping("/public/hello")
    public String publicEndpoint() {
        return "Hello! This is public.";
    }

    // Must be logged in (any role)
    @GetMapping("/hello")
    public Map<String, String> securedEndpoint(@AuthenticationPrincipal Jwt jwt) {
        return Map.of(
                "message", "Hello, you are authenticated!",
                "username", jwt.getClaim("preferred_username"),
                "email", jwt.getClaim("email")
        );
    }

    // Must have ROLE_ADMIN
    @GetMapping("/admin/hello")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminEndpoint(@AuthenticationPrincipal Jwt jwt) {
        return "Hello Admin: " + jwt.getClaim("preferred_username");
    }
}
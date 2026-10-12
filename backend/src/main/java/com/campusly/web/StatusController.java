package com.campusly.web;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {
    @GetMapping({"/", "/health"})
    public Map<String, String> status() {
        return Map.of("application", "Campusly", "status", "running");
    }
}

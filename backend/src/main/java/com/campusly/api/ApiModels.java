package com.campusly.api;
import jakarta.validation.constraints.*;
import java.time.LocalDate; import java.util.List; import java.util.UUID;
public final class ApiModels {
 private ApiModels(){}
 public record RegisterRequest(@NotBlank @Size(max=80) String name,@NotBlank @Email @Size(max=254) String email,@NotBlank @Size(min=8,max=100) String password){}
 public record LoginRequest(@NotBlank @Email String email,@NotBlank String password){}
 public record AuthResponse(String token,String tokenType,UserView user){}
 public record UserView(UUID id,String name,String email,String role){}
 public record ProfileRequest(@NotBlank @Size(max=80) String name,@NotBlank @Email @Size(max=254) String email,@Size(max=80) String program,@Size(max=4) String year,@Size(max=1200) String bio,@Size(max=1200) String skills){}
 public record ProfileView(UUID id,String name,String email,String program,String year,String bio,String skills,String role){}
 public record OpportunityRequest(@NotBlank @Size(max=120) String title,@NotBlank @Size(max=120) String organization,@Size(max=100) String subtitle,@Size(max=4) String mark,@Size(max=20) String tone,@NotBlank String category,@NotBlank @Size(max=2500) String description,@Size(max=1000) List<String> skills,@NotBlank @Size(max=300) String eligibility,@NotNull LocalDate deadline,@Size(max=120) String type,@Size(max=120) String location){}
 public record OpportunityView(UUID id,String title,String organization,String subtitle,String mark,String tone,String category,String description,List<String> skills,String eligibility,LocalDate deadline,LocalDate posted,String type,String location){}
 public record ApplicationRequest(@NotNull UUID opportunityId,@Size(max=1600) String note){}
 public record ApplicationStatusRequest(@NotBlank String status){}
 public record ApplicationView(UUID id,UUID opportunityId,String title,String organization,String category,String status,LocalDate appliedAt,String note){}
 public record Message(String message){}
}

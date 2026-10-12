package com.campusly.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity @Table(name="campus_users")
public class UserAccount {
    @Id @GeneratedValue(strategy=GenerationType.UUID) private UUID id;
    @Column(nullable=false, unique=true, length=254) private String email;
    @Column(nullable=false, length=80) private String name;
    @Column(nullable=false) private String passwordHash;
    @Enumerated(EnumType.STRING) @Column(nullable=false, length=16) private UserRole role=UserRole.STUDENT;
    private String program="";
    private String graduationYear="2027";
    @Column(length=1200) private String bio="";
    @Column(length=1200) private String skills="";
    @Column(nullable=false) private Instant createdAt=Instant.now();
    protected UserAccount() {}
    public UserAccount(String email,String name,String passwordHash){this.email=email.toLowerCase().trim();this.name=name.trim();this.passwordHash=passwordHash;}
    public UUID getId(){return id;} public String getEmail(){return email;} public String getName(){return name;}
    public String getPasswordHash(){return passwordHash;} public UserRole getRole(){return role;}
    public String getProgram(){return program;} public String getGraduationYear(){return graduationYear;}
    public String getBio(){return bio;} public String getSkills(){return skills;}
    public void updateProfile(String name,String email,String program,String graduationYear,String bio,String skills){this.name=name.trim();this.email=email.toLowerCase().trim();this.program=program==null?"":program.trim();this.graduationYear=graduationYear==null?"2027":graduationYear;this.bio=bio==null?"":bio.trim();this.skills=skills==null?"":skills.trim();}
    public void setRole(UserRole role){this.role=role;}
}

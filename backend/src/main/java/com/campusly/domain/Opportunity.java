package com.campusly.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity @Table(name="opportunities")
public class Opportunity {
    @Id @GeneratedValue(strategy=GenerationType.UUID) private UUID id;
    @Column(nullable=false,length=120) private String title;
    @Column(nullable=false,length=120) private String organization;
    @Column(length=100) private String subtitle="Campus opportunity";
    @Column(length=4) private String mark="✦";
    @Column(length=20) private String tone="green";
    @Column(nullable=false,length=32) private String category;
    @Column(nullable=false,length=2500) private String description;
    @Column(length=1000) private String skillsCsv="";
    @Column(nullable=false,length=300) private String eligibility;
    @Column(nullable=false) private LocalDate deadline;
    @Column(nullable=false) private LocalDate posted=LocalDate.now();
    @Column(length=120) private String type="Campus opportunity";
    @Column(length=120) private String location="Campus";
    protected Opportunity() {}
    public Opportunity(String title,String organization,String subtitle,String mark,String tone,String category,String description,String skillsCsv,String eligibility,LocalDate deadline,String type,String location){this.title=title;this.organization=organization;this.subtitle=subtitle;this.mark=mark;this.tone=tone;this.category=category;this.description=description;this.skillsCsv=skillsCsv;this.eligibility=eligibility;this.deadline=deadline;this.type=type;this.location=location;}
    public UUID getId(){return id;} public String getTitle(){return title;} public String getOrganization(){return organization;} public String getSubtitle(){return subtitle;} public String getMark(){return mark;} public String getTone(){return tone;} public String getCategory(){return category;} public String getDescription(){return description;} public String getSkillsCsv(){return skillsCsv;} public String getEligibility(){return eligibility;} public LocalDate getDeadline(){return deadline;} public LocalDate getPosted(){return posted;} public String getType(){return type;} public String getLocation(){return location;}
    public void update(String title,String organization,String subtitle,String mark,String tone,String category,String description,String skillsCsv,String eligibility,LocalDate deadline,String type,String location){this.title=title;this.organization=organization;this.subtitle=subtitle;this.mark=mark;this.tone=tone;this.category=category;this.description=description;this.skillsCsv=skillsCsv;this.eligibility=eligibility;this.deadline=deadline;this.type=type;this.location=location;}
}

package com.campusly.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity @Table(name="student_applications", uniqueConstraints=@UniqueConstraint(columnNames={"student_id","opportunity_id"}))
public class StudentApplication {
    @Id @GeneratedValue(strategy=GenerationType.UUID) private UUID id;
    @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="student_id") private UserAccount student;
    @ManyToOne(optional=false,fetch=FetchType.EAGER) @JoinColumn(name="opportunity_id") private Opportunity opportunity;
    @Column(nullable=false,length=24) private String status="Submitted";
    @Column(nullable=false) private LocalDate appliedAt=LocalDate.now();
    @Column(length=1600) private String note="";
    protected StudentApplication() {}
    public StudentApplication(UserAccount student,Opportunity opportunity,String note){this.student=student;this.opportunity=opportunity;this.note=note==null?"":note;}
    public UUID getId(){return id;} public UserAccount getStudent(){return student;} public Opportunity getOpportunity(){return opportunity;} public String getStatus(){return status;} public LocalDate getAppliedAt(){return appliedAt;} public String getNote(){return note;}
    public void setStatus(String status){this.status=status;}
}

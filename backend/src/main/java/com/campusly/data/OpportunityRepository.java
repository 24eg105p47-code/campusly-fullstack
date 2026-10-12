package com.campusly.data;
import com.campusly.domain.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface OpportunityRepository extends JpaRepository<Opportunity,UUID>{}

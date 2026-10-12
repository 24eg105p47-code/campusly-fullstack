package com.campusly.data;
import com.campusly.domain.StudentApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; import java.util.Optional; import java.util.UUID;
public interface ApplicationRepository extends JpaRepository<StudentApplication,UUID>{List<StudentApplication> findAllByStudentIdOrderByAppliedAtDesc(UUID id);Optional<StudentApplication> findByIdAndStudentId(UUID id,UUID studentId);boolean existsByStudentIdAndOpportunityId(UUID studentId,UUID opportunityId);}

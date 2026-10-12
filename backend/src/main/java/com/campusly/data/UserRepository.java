package com.campusly.data;
import com.campusly.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional; import java.util.UUID;
public interface UserRepository extends JpaRepository<UserAccount,UUID>{Optional<UserAccount> findByEmailIgnoreCase(String email);boolean existsByEmailIgnoreCase(String email);}

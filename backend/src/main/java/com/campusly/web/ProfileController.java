package com.campusly.web;
import com.campusly.api.ApiModels.*; import com.campusly.data.UserRepository; import com.campusly.domain.UserAccount; import jakarta.validation.Valid; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*; import org.springframework.web.server.ResponseStatusException; import org.springframework.http.HttpStatus; import java.util.UUID;
@RestController @RequestMapping("/api/profile")
public class ProfileController {
 private final UserRepository users; public ProfileController(UserRepository users){this.users=users;}
 @GetMapping public ProfileView get(Authentication auth){return view(current(auth));}
 @PutMapping public ProfileView update(Authentication auth,@Valid @RequestBody ProfileRequest body){UserAccount user=current(auth);String email=body.email().trim().toLowerCase();users.findByEmailIgnoreCase(email).filter(other->!other.getId().equals(user.getId())).ifPresent(other->{throw new ResponseStatusException(HttpStatus.CONFLICT,"That email is already in use.");});user.updateProfile(body.name(),email,body.program(),body.year(),body.bio(),body.skills());return view(users.save(user));}
 private UserAccount current(Authentication auth){return users.findById(UUID.fromString(auth.getName())).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED));}
 private ProfileView view(UserAccount u){return new ProfileView(u.getId(),u.getName(),u.getEmail(),u.getProgram(),u.getGraduationYear(),u.getBio(),u.getSkills(),u.getRole().name());}
}

package com.campusly.web;
import com.campusly.api.ApiModels.*; import com.campusly.auth.JwtService; import com.campusly.data.UserRepository; import com.campusly.domain.UserAccount; import jakarta.validation.Valid; import org.springframework.http.HttpStatus; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.web.bind.annotation.*; import org.springframework.web.server.ResponseStatusException;
@RestController @RequestMapping("/api/auth")
public class AuthController {
 private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
 public AuthController(UserRepository users,PasswordEncoder encoder,JwtService jwt){this.users=users;this.encoder=encoder;this.jwt=jwt;}
 @PostMapping("/register") public AuthResponse register(@Valid @RequestBody RegisterRequest request){String email=request.email().trim().toLowerCase();if(users.existsByEmailIgnoreCase(email))throw new ResponseStatusException(HttpStatus.CONFLICT,"An account already uses this email.");UserAccount user=users.save(new UserAccount(email,request.name(),encoder.encode(request.password())));return response(user);}
 @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest request){UserAccount user=users.findByEmailIgnoreCase(request.email().trim()).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Email or password is incorrect."));if(!encoder.matches(request.password(),user.getPasswordHash()))throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Email or password is incorrect.");return response(user);}
 private AuthResponse response(UserAccount u){return new AuthResponse(jwt.issue(u),"Bearer",new UserView(u.getId(),u.getName(),u.getEmail(),u.getRole().name()));}
}

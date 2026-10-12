package com.campusly.auth;
import com.campusly.data.UserRepository;
import com.campusly.domain.UserAccount;
import io.jsonwebtoken.Claims; import io.jsonwebtoken.Jwts; import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain; import jakarta.servlet.ServletException; import jakarta.servlet.http.HttpServletRequest; import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value; import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; import org.springframework.security.core.authority.SimpleGrantedAuthority; import org.springframework.security.core.context.SecurityContextHolder; import org.springframework.stereotype.Component; import org.springframework.web.filter.OncePerRequestFilter;
import javax.crypto.SecretKey; import java.io.IOException; import java.nio.charset.StandardCharsets; import java.time.Instant; import java.util.Date; import java.util.List; import java.util.UUID;
@Component
public class JwtService extends OncePerRequestFilter {
 private final SecretKey key; private final UserRepository users; private final long expirationHours;
 public JwtService(@Value("${campusly.jwt.secret}") String secret,@Value("${campusly.jwt.expiration-hours:12}") long expirationHours,UserRepository users){this.key=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));this.expirationHours=expirationHours;this.users=users;}
 public String issue(UserAccount user){Instant now=Instant.now();return Jwts.builder().subject(user.getId().toString()).claim("role",user.getRole().name()).issuedAt(Date.from(now)).expiration(Date.from(now.plusSeconds(expirationHours*3600))).signWith(key).compact();}
 @Override protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain)throws ServletException,IOException{
  String header=request.getHeader("Authorization");
  if(header!=null&&header.startsWith("Bearer "))try{Claims claims=Jwts.parser().verifyWith(key).build().parseSignedClaims(header.substring(7)).getPayload();UUID id=UUID.fromString(claims.getSubject());users.findById(id).ifPresent(user->{var auth=new UsernamePasswordAuthenticationToken(id.toString(),null,List.of(new SimpleGrantedAuthority("ROLE_"+user.getRole().name())));SecurityContextHolder.getContext().setAuthentication(auth);});}catch(Exception ignored){SecurityContextHolder.clearContext();}
  chain.doFilter(request,response);
 }
}

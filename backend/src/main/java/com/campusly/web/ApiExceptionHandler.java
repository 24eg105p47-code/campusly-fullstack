package com.campusly.web;
import com.campusly.api.ApiModels.Message; import jakarta.validation.ConstraintViolationException; import org.springframework.http.HttpStatus; import org.springframework.http.ResponseEntity; import org.springframework.security.access.AccessDeniedException; import org.springframework.web.bind.MethodArgumentNotValidException; import org.springframework.web.bind.annotation.ExceptionHandler; import org.springframework.web.bind.annotation.RestControllerAdvice; import org.springframework.web.server.ResponseStatusException; import java.util.Map;
@RestControllerAdvice
public class ApiExceptionHandler {
 @ExceptionHandler(ResponseStatusException.class) ResponseEntity<?> status(ResponseStatusException e){return ResponseEntity.status(e.getStatusCode()).body(new Message(e.getReason()==null?"Request failed.":e.getReason()));}
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<?> invalid(MethodArgumentNotValidException e){String message=e.getBindingResult().getFieldErrors().stream().findFirst().map(x->x.getField()+" "+x.getDefaultMessage()).orElse("Request is invalid.");return ResponseEntity.badRequest().body(new Message(message));}
 @ExceptionHandler(AccessDeniedException.class) ResponseEntity<?> denied(){return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Message("Administrator access required."));}
 @ExceptionHandler(Exception.class) ResponseEntity<?> other(Exception e){return ResponseEntity.status(500).body(new Message("The server could not complete the request."));}
}

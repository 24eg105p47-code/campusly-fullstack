package com.campusly.web;
import com.campusly.api.ApiModels.*; import com.campusly.data.OpportunityRepository; import com.campusly.domain.Opportunity; import jakarta.validation.Valid; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*; import org.springframework.web.server.ResponseStatusException; import org.springframework.http.HttpStatus; import java.time.LocalDate; import java.util.Arrays; import java.util.List; import java.util.UUID;
@RestController @RequestMapping("/api/opportunities")
public class OpportunityController {
 private final OpportunityRepository opportunities; public OpportunityController(OpportunityRepository opportunities){this.opportunities=opportunities;}
 @GetMapping public List<OpportunityView> list(){return opportunities.findAll().stream().filter(o->!o.getDeadline().isBefore(LocalDate.now())).map(this::view).toList();}
 @GetMapping("/{id}") public OpportunityView get(@PathVariable UUID id){return view(find(id));}
 @PostMapping @PreAuthorize("hasRole('ADMIN')") @ResponseStatus(HttpStatus.CREATED) public OpportunityView create(@Valid @RequestBody OpportunityRequest r){return view(opportunities.save(new Opportunity(r.title(),r.organization(),fallback(r.subtitle(),"Campus opportunity"),fallback(r.mark(),initials(r.organization())),fallback(r.tone(),"green"),r.category(),r.description(),skills(r.skills()),r.eligibility(),r.deadline(),fallback(r.type(),r.category()),fallback(r.location(),"Campus"))));}
 @PutMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public OpportunityView update(@PathVariable UUID id,@Valid @RequestBody OpportunityRequest r){Opportunity o=find(id);o.update(r.title(),r.organization(),fallback(r.subtitle(),"Campus opportunity"),fallback(r.mark(),initials(r.organization())),fallback(r.tone(),"green"),r.category(),r.description(),skills(r.skills()),r.eligibility(),r.deadline(),fallback(r.type(),r.category()),fallback(r.location(),"Campus"));return view(opportunities.save(o));}
 @DeleteMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable UUID id){opportunities.delete(find(id));}
 private Opportunity find(UUID id){return opportunities.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Opportunity not found."));}
 private OpportunityView view(Opportunity o){List<String> skills=o.getSkillsCsv()==null||o.getSkillsCsv().isBlank()?List.of():Arrays.stream(o.getSkillsCsv().split(",")).map(String::trim).filter(s->!s.isBlank()).toList();return new OpportunityView(o.getId(),o.getTitle(),o.getOrganization(),o.getSubtitle(),o.getMark(),o.getTone(),o.getCategory(),o.getDescription(),skills,o.getEligibility(),o.getDeadline(),o.getPosted(),o.getType(),o.getLocation());}
 private String skills(List<String> skills){return skills==null?"":String.join(",",skills);}
 private String fallback(String value,String fallback){return value==null||value.isBlank()?fallback:value.trim();}
 private String initials(String value){return Arrays.stream(value.trim().split("\\s+")).limit(2).map(s->s.substring(0,1).toUpperCase()).reduce("",String::concat);}
}

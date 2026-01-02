package PAAV.Resume_Builder.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PAAV.Resume_Builder.model.ContactRequest;
import PAAV.Resume_Builder.repository.ContactRequestRepository;

@RestController
@RequestMapping("/api/contact-requests")
@CrossOrigin(origins = "http://localhost:5173")  // Adjust based on frontend URL
public class ContactRequestController {

    private final ContactRequestRepository contactRequestRepository;
    
    public ContactRequestController(ContactRequestRepository contactRequestRepository) {
        this.contactRequestRepository = contactRequestRepository;
    }

    // ✅ Add a new contact request
    @PostMapping("/add")
    public ResponseEntity<String> addContactRequest(@RequestBody ContactRequest request) {
        contactRequestRepository.save(request);
        return ResponseEntity.ok("Message submitted successfully!");
    }

    // ✅ Get all contact requests
    @GetMapping("/all")
    public ResponseEntity<List<ContactRequest>> getAllRequests() {
        return ResponseEntity.ok(contactRequestRepository.findAll());
    }

    // ✅ Mark a request as Resolved by ID
    @PutMapping("/resolve/{id}")
    public ResponseEntity<String> markAsResolved(@PathVariable String id) {
        Optional<ContactRequest> requestOptional = contactRequestRepository.findById(id);
        
        if (requestOptional.isPresent()) {
            ContactRequest request = requestOptional.get();
            request.setStatus("Resolved");
            contactRequestRepository.save(request);  // Save updated status
            return ResponseEntity.ok("Request marked as resolved!");
        } else {
            return ResponseEntity.badRequest().body("Request not found!");
        }
    }
}

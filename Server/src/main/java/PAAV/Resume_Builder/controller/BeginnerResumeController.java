package PAAV.Resume_Builder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import PAAV.Resume_Builder.model.BeginnerResume;
import PAAV.Resume_Builder.service.BeginnerResumeService;

@RestController
@RequestMapping("/api/beginner-resume")
@CrossOrigin(origins = "http://localhost:5173")
public class BeginnerResumeController {

    @Autowired
    private BeginnerResumeService resumeService;

    @PostMapping("/add")
    public ResponseEntity<String> addBeginnerResume(@RequestBody BeginnerResume beginnerResume) {
        try {
            // Check if a resume with the same name already exists for the user
            List<BeginnerResume> existingResumes = resumeService.getResumesByUserId(beginnerResume.getUserId());

            boolean resumeExists = existingResumes.stream()
                    .anyMatch(resume -> resume.getTemplateName().equalsIgnoreCase(beginnerResume.getTemplateName()));

            if (resumeExists) {
                return new ResponseEntity<>("A resume template with the same name already exists.", HttpStatus.BAD_REQUEST);
            }

            // Save the new resume
            BeginnerResume savedResume = resumeService.saveResume(beginnerResume);
            return new ResponseEntity<>("Resume template added with ID: " + savedResume.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add resume template: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-by-userId")
    public ResponseEntity<List<BeginnerResume>> getResumesByUserId(@RequestParam String userId) {
        try {
            List<BeginnerResume> resumes = resumeService.getResumesByUserId(userId);
            if (resumes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(resumes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
}

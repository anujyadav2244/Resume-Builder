package PAAV.Resume_Builder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import PAAV.Resume_Builder.model.ExperiencedResume;
import PAAV.Resume_Builder.service.ExperiencedResumeService;

@RestController
@RequestMapping("/api/experienced-resume")
@CrossOrigin(origins = "http://localhost:5173")
public class ExperiencedResumeController {

    @Autowired
    private ExperiencedResumeService resumeService;

    @PostMapping("/add")
    public ResponseEntity<String> addExperiencedResume(@RequestBody ExperiencedResume experiencedResume) {
        try {
            // Check if a resume with the same template name already exists for the user
            List<ExperiencedResume> existingResumes = resumeService.getResumesByUserId(experiencedResume.getUserId());

            boolean resumeExists = existingResumes.stream()
                    .anyMatch(resume -> resume.getTemplateName().equalsIgnoreCase(experiencedResume.getTemplateName()));

            if (resumeExists) {
                return new ResponseEntity<>("A resume template with the same name already exists.", HttpStatus.BAD_REQUEST);
            }

            // Save the new resume
            ExperiencedResume savedResume = resumeService.saveResume(experiencedResume);
            return new ResponseEntity<>("Resume template added with ID: " + savedResume.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add resume template: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-by-userId")
    public ResponseEntity<List<ExperiencedResume>> getResumesByUserId(@RequestParam String userId) {
        try {
            List<ExperiencedResume> resumes = resumeService.getResumesByUserId(userId);
            if (resumes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(resumes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

package PAAV.Resume_Builder.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PAAV.Resume_Builder.model.BeginnerResume;
import PAAV.Resume_Builder.repository.BeginnerResumeRepository;

@Service
public class BeginnerResumeService {

    @Autowired
    private BeginnerResumeRepository resumeRepository;

    // Method to save a resume
    public BeginnerResume saveResume(BeginnerResume resume) {
        return resumeRepository.save(resume);  // Save the resume to the database
    }
    
    public BeginnerResume getResumeById(String id) {
        return resumeRepository.findById(id).orElse(null);  // Return null if no resume is found
    }

    public List<BeginnerResume> getResumesByUserId(String userId) {
        return resumeRepository.findByUserId(userId);  // Fetch resumes based on userId
    }

}

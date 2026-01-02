package PAAV.Resume_Builder.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PAAV.Resume_Builder.model.ExperiencedResume;
import PAAV.Resume_Builder.repository.ExperiencedResumeRepository;

@Service
public class ExperiencedResumeService {

    @Autowired
    private ExperiencedResumeRepository resumeRepository;

    public ExperiencedResume saveResume(ExperiencedResume experiencedResume) {
        return resumeRepository.save(experiencedResume);
    }

    public List<ExperiencedResume> getResumesByUserId(String userId) {
        return resumeRepository.findByUserId(userId);
    }

    public ExperiencedResume getResumeById(String id) {
        return resumeRepository.findById(id).orElse(null);
    }

    public void deleteResume(String id) {
        resumeRepository.deleteById(id);
    }
}

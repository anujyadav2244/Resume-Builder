package PAAV.Resume_Builder.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import PAAV.Resume_Builder.model.BeginnerResume;

@Repository
public interface BeginnerResumeRepository extends MongoRepository<BeginnerResume, String> {
    
    // Custom method to find resumes by userId
    List<BeginnerResume> findByUserId(String userId);
}

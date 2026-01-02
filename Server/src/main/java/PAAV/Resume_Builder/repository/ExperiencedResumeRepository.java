package PAAV.Resume_Builder.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import PAAV.Resume_Builder.model.ExperiencedResume;

public interface ExperiencedResumeRepository extends MongoRepository<ExperiencedResume, String> {
    List<ExperiencedResume> findByUserId(String userId);
}

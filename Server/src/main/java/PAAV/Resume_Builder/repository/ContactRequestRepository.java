package PAAV.Resume_Builder.repository;

import PAAV.Resume_Builder.model.ContactRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRequestRepository extends MongoRepository<ContactRequest, String> {
}

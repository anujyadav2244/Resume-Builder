package PAAV.Resume_Builder.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import PAAV.Resume_Builder.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email); 
}

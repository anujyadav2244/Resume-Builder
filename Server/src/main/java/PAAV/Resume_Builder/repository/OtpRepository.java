package PAAV.Resume_Builder.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import PAAV.Resume_Builder.model.Otp;

@Repository
public interface OtpRepository extends MongoRepository<Otp, String> {
    Optional<Otp> findByEmail(String email);
    Optional<Otp> findTopByEmailOrderByCreatedAtDesc(String email);
    void deleteByEmail(String email); // Delete OTP when verified
}

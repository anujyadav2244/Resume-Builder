package PAAV.Resume_Builder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import PAAV.Resume_Builder.model.Otp;
import PAAV.Resume_Builder.repository.OtpRepository;

@Service
public class OtpService {
    
    @Autowired
    private OtpRepository otpRepository;

    // Generate and Save OTP
    public String saveOtp(String email, String otp) {
        Otp otpEntry = new Otp(email, otp);
        otpRepository.save(otpEntry);
        return otp;
    }
    
    // Fetch the latest OTP for the given email
    public Optional<Otp> getLatestOtp(String email) {
        return otpRepository.findTopByEmailOrderByCreatedAtDesc(email);
    }



}

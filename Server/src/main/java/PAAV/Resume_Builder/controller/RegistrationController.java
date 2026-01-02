package PAAV.Resume_Builder.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Optional;

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

import PAAV.Resume_Builder.dto.EmailRequest;
import PAAV.Resume_Builder.model.Otp;
import PAAV.Resume_Builder.model.User;
import PAAV.Resume_Builder.service.EmailService;
import PAAV.Resume_Builder.service.EmailTemplates;
import PAAV.Resume_Builder.service.OtpService;
import PAAV.Resume_Builder.service.UserService;
import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private OtpService otpService;

    @PostMapping("/register-otp")
    public ResponseEntity<String> registerUser(@RequestBody EmailRequest emailRequest) {
        // Check if a user with the given email already exists
        User existingUser = userService.findByEmail(emailRequest.getEmail());

        if (existingUser != null) {
            // If the email already exists, return an invalid response
            return new ResponseEntity<>("Email is already registered.", HttpStatus.BAD_REQUEST);
        }

        try {
            String otp = generateOtp();
            otpService.saveOtp(emailRequest.getEmail(), otp);
            emailService.sendHtmlEmail(emailRequest.getEmail(), "Your OTP Code", EmailTemplates.getOtpEmail(otp));

            return new ResponseEntity<>("OTP Sent Successfully to " + emailRequest.getEmail(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("User registration failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtpAndRegister(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String password = requestBody.get("password");
        String otp = requestBody.get("otp");

        // Fetch the latest OTP for the given email
        if (userService.findByEmail(email) != null) {
            return new ResponseEntity<>("Email is already registered.", HttpStatus.BAD_REQUEST);
        }
        Optional<Otp> latestOtp = otpService.getLatestOtp(email);

        if (latestOtp.isEmpty() || !latestOtp.get().getOtp().equals(otp)) {
            return new ResponseEntity<>("Invalid or expired OTP.", HttpStatus.BAD_REQUEST);
        }

        // Check if the user already exists
        // Create and save the user
        User savedUser = userService.createUser(email, password);

        if (savedUser != null) {
            return new ResponseEntity<>("User registered successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to register user.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        // Find user by email
        User existingUser = userService.findByEmail(user.getEmail());

        // Check if user exists and password is correct
        if (existingUser != null && userService.loginUser(user.getEmail(), user.getPassword())) {
            // Return only the user ID
            return new ResponseEntity<>(existingUser.getId(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid email or password.", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/fetch")
    public ResponseEntity<Map<String, Object>> fetchUser(@RequestParam String id) {
        Map<String, Object> response = new HashMap<>();

        // Find user by ID
        User user = userService.findById(id);
        if (user == null) {
            response.put("error", "User not found.");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        // Return email and password length
        response.put("email", user.getEmail());
        response.put("passwordLength", user.getPassword().length());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");

        // Find user by email
        User user = userService.findByEmail(email);
        if (user == null) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }

        try {
            // Generate OTP
            String otp = generateOtp();
            otpService.saveOtp(email, otp);

            // Send OTP via email
            emailService.sendHtmlEmail(email, "Password Reset OTP", EmailTemplates.getOtpEmail(otp));

            return new ResponseEntity<>("OTP sent successfully to " + email, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to send OTP: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/reset-password")
public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> requestBody) {
    String email = requestBody.get("email");
    String otp = requestBody.get("otp");
    String newPassword = requestBody.get("newPassword");
    
    // Fetch the latest OTP for the given email
    Optional<Otp> latestOtp = otpService.getLatestOtp(email);

    if (latestOtp.isEmpty() || !latestOtp.get().getOtp().equals(otp)) {
        return new ResponseEntity<>("Invalid or expired OTP.", HttpStatus.BAD_REQUEST);
    }

    // Update password
    boolean isUpdated = userService.updatePassword(email, newPassword);
    if (isUpdated) {
        return new ResponseEntity<>("Password reset successfully.", HttpStatus.OK);
    } else {
        return new ResponseEntity<>("Failed to reset password.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}

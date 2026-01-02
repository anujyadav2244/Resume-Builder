package PAAV.Resume_Builder.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "otps")
public class Otp {
    @Id
    private String id;
    private String email;
    private String otp;

    @Indexed(expireAfterSeconds = 180)  // TTL Index: Deletes document after 3 minutes (180 seconds)
    private Date createdAt;

    public Otp() {}

    public Otp(String email, String otp) {
        this.email = email;
        this.otp = otp;
        this.createdAt = new Date();  // Automatically stores the creation time
    }

    // Getters & Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}

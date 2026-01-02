package PAAV.Resume_Builder.service;

public class EmailTemplates {
    public static String getWelcomeEmail() {
        return "<!DOCTYPE html>"
                + "<html><head><style>"
                + "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }"
                + ".email-container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; "
                + "border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center; }"
                + ".mascot { width: 150px; height: auto; margin-bottom: 20px; }"
                + "h2 { color: #333; font-size: 24px; margin-bottom: 10px; }"
                + "p { font-size: 16px; color: #666; line-height: 1.6; }"
                + ".button { display: inline-block; background: #007BFF; color: #ffffff; padding: 12px 20px; "
                + "text-decoration: none; border-radius: 5px; margin-top: 20px; font-size: 16px; }"
                + "</style></head><body>"
                + "<div class='email-container'>"
                + "<img src='https://res.cloudinary.com/dv4lnqsm5/image/upload/v1738946119/Builder_eyzrau.png' alt='Mascot' class='mascot' />"
                + "<h2>Welcome to Resume Builder!</h2>"
                + "<p>Thank you for joining us. We are thrilled to have you on board!</p>"
                + "<p>Start building your professional resume effortlessly.</p>"
                + "<a href='http://localhost:5173' class='button'>Get Started</a>"
                + "</div>"
                + "</body></html>";
    }
    
    public static String getOtpEmail(String otp) {
        return "<!DOCTYPE html>"
                + "<html><head><style>"
                + "body { font-family: Arial, sans-serif; text-align: center; }"
                + ".container { padding: 20px; border: 1px solid #ddd; max-width: 400px; margin: auto; }"
                + ".otp-code { font-size: 24px; font-weight: bold; color: #007bff; }"
                + "</style></head><body>"
                + "<div class='container'>"
                + "<h2>Your OTP Code</h2>"
                + "<p class='otp-code'>" + otp + "</p>"
                + "<p>This OTP is valid for 3 minutes.</p>"
                + "</div>"
                + "</body></html>";
    }
}

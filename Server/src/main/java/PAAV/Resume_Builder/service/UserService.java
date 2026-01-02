package PAAV.Resume_Builder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PAAV.Resume_Builder.model.User;
import PAAV.Resume_Builder.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email); // Return User directly
    }

    public User createUser(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        
        return userRepository.save(user); // This saves the user to the "users" collection
    }
    
    public boolean loginUser(String email, String inputPassword) {
        User user = userRepository.findByEmail(email);
    
        if (user == null || user.getPassword() == null) {
            return false; // User not found or password is null
        }
    
        return user.getPassword().equals(inputPassword);
    }
    

    public User findById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public boolean updatePassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setPassword(newPassword); // Hashing should be applied before saving
            userRepository.save(user);
            return true;
        }
        return false;
    }
    
    
}

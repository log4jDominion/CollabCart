package com.influencer.platform.service;

import com.influencer.platform.model.User;
import com.influencer.platform.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(User user) {
        // Check if user with email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        // Hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Set timestamps
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);
        
        return userRepository.save(user);
    }

    public Optional<User> updateUser(String id, User userDetails) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // Update fields
                    if (userDetails.getName() != null) {
                        existingUser.setName(userDetails.getName());
                    }
                    if (userDetails.getEmail() != null) {
                        existingUser.setEmail(userDetails.getEmail());
                    }
                    if (userDetails.getPassword() != null) {
                        existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                    }
                    
                    existingUser.setUpdatedAt(LocalDateTime.now());
                    return userRepository.save(existingUser);
                });
    }

    public boolean deleteUser(String id) {
        return userRepository.deleteById(id);
    }

    public boolean validateCredentials(String email, String password) {
        return userRepository.findByEmail(email)
                .map(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElse(false);
    }
}

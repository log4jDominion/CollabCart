package com.influencer.platform.controller;

import com.influencer.platform.model.CompanyProfile;
import com.influencer.platform.model.InfluencerProfile;
import com.influencer.platform.model.User;
import com.influencer.platform.service.CompanyProfileService;
import com.influencer.platform.service.InfluencerProfileService;
import com.influencer.platform.service.UserService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/register")
public class RegisterController {
    private final UserService userService;
    private final InfluencerProfileService influencerProfileService;
    private final CompanyProfileService companyProfileService;

    public RegisterController(
            UserService userService,
            InfluencerProfileService influencerProfileService,
            CompanyProfileService companyProfileService) {
        this.userService = userService;
        this.influencerProfileService = influencerProfileService;
        this.companyProfileService = companyProfileService;
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            // Create user
            User user = new User();
            user.setName(registerRequest.getName());
            user.setEmail(registerRequest.getEmail());
            user.setPassword(registerRequest.getPassword());
            user.setUserType(User.UserType.valueOf(registerRequest.getUserType().toUpperCase()));
            
            User createdUser = userService.createUser(user);
            
            // Create profile based on user type
            if (user.getUserType() == User.UserType.INFLUENCER) {
                InfluencerProfile profile = new InfluencerProfile();
                profile.setUserId(createdUser.getId());
                profile.setBio("");
                profile.setLocation("");
                profile.setCategories(new ArrayList<>());
                profile.setPriceRange("");
                
                influencerProfileService.createProfile(profile);
            } else if (user.getUserType() == User.UserType.COMPANY) {
                CompanyProfile profile = new CompanyProfile();
                profile.setUserId(createdUser.getId());
                profile.setWebsite("");
                profile.setIndustry("");
                profile.setDescription("");
                profile.setLocation("");
                profile.setSize("");
                
                companyProfileService.createProfile(profile);
            }
            
            return ResponseEntity.status(201).body(Map.of(
                    "message", "User created successfully",
                    "user", Map.of(
                            "id", createdUser.getId(),
                            "name", createdUser.getName(),
                            "email", createdUser.getEmail(),
                            "userType", createdUser.getUserType()
                    )
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "An error occurred during registration"));
        }
    }

    @Data
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String userType;
    }
}

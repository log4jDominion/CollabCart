package com.influencer.platform.controller;

import com.influencer.platform.model.CompanyProfile;
import com.influencer.platform.model.InfluencerProfile;
import com.influencer.platform.model.User;
import com.influencer.platform.security.UserPrincipal;
import com.influencer.platform.service.CompanyProfileService;
import com.influencer.platform.service.InfluencerProfileService;
import com.influencer.platform.service.UserService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    private final UserService userService;
    private final InfluencerProfileService influencerProfileService;
    private final CompanyProfileService companyProfileService;

    public ProfileController(
            UserService userService,
            InfluencerProfileService influencerProfileService,
            CompanyProfileService companyProfileService) {
        this.userService = userService;
        this.influencerProfileService = influencerProfileService;
        this.companyProfileService = companyProfileService;
    }

    @GetMapping("/influencer")
    public ResponseEntity<?> getInfluencerProfile(@AuthenticationPrincipal UserPrincipal currentUser) {
        if (!"INFLUENCER".equalsIgnoreCase(currentUser.getUserType())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only influencers can access this endpoint"));
        }
        
        Optional<User> userOpt = userService.getUserById(currentUser.getId());
        Optional<InfluencerProfile> profileOpt = influencerProfileService.getProfileByUserId(currentUser.getId());
        
        if (userOpt.isEmpty() || profileOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        User user = userOpt.get();
        InfluencerProfile profile = profileOpt.get();
        
        return ResponseEntity.ok(Map.of(
                "id", profile.getId(),
                "bio", profile.getBio(),
                "location", profile.getLocation(),
                "categories", profile.getCategories(),
                "priceRange", profile.getPriceRange(),
                "name", user.getName(),
                "email", user.getEmail()
        ));
    }

    @PutMapping("/influencer")
    public ResponseEntity<?> updateInfluencerProfile(
            @RequestBody UpdateInfluencerProfileRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        if (!"INFLUENCER".equalsIgnoreCase(currentUser.getUserType())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only influencers can update their profile"));
        }
        
        // Update user data if provided
        if (request.getName() != null || request.getEmail() != null) {
            userService.getUserById(currentUser.getId())
                    .ifPresent(user -> {
                        if (request.getName() != null) {
                            user.setName(request.getName());
                        }
                        if (request.getEmail() != null) {
                            user.setEmail(request.getEmail());
                        }
                        userService.updateUser(currentUser.getId(), user);
                    });
        }
        
        // Update profile data
        return influencerProfileService.getProfileByUserId(currentUser.getId())
                .map(profile -> {
                    if (request.getBio() != null) {
                        profile.setBio(request.getBio());
                    }
                    if (request.getLocation() != null) {
                        profile.setLocation(request.getLocation());
                    }
                    if (request.getCategories() != null) {
                        profile.setCategories(request.getCategories());
                    }
                    if (request.getPriceRange() != null) {
                        profile.setPriceRange(request.getPriceRange());
                    }
                    
                    InfluencerProfile updatedProfile = influencerProfileService.updateProfile(profile.getId(), profile)
                            .orElse(profile);
                    
                    return ResponseEntity.ok(Map.of(
                            "message", "Profile updated successfully",
                            "profile", updatedProfile
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/company")
    public ResponseEntity<?> getCompanyProfile(@AuthenticationPrincipal UserPrincipal currentUser) {
        if (!"COMPANY".equalsIgnoreCase(currentUser.getUserType())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only companies can access this endpoint"));
        }
        
        Optional<User> userOpt = userService.getUserById(currentUser.getId());
        Optional<CompanyProfile> profileOpt = companyProfileService.getProfileByUserId(currentUser.getId());
        
        if (userOpt.isEmpty() || profileOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        User user = userOpt.get();
        CompanyProfile profile = profileOpt.get();
        
        return ResponseEntity.ok(Map.of(
                "id", profile.getId(),
                "website", profile.getWebsite(),
                "industry", profile.getIndustry(),
                "description", profile.getDescription(),
                "location", profile.getLocation(),
                "size", profile.getSize(),
                "name", user.getName(),
                "email", user.getEmail()
        ));
    }

    @PutMapping("/company")
    public ResponseEntity<?> updateCompanyProfile(
            @RequestBody UpdateCompanyProfileRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        if (!"COMPANY".equalsIgnoreCase(currentUser.getUserType())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only companies can update their profile"));
        }
        
        // Update user data if provided
        if (request.getName() != null || request.getEmail() != null) {
            userService.getUserById(currentUser.getId())
                    .ifPresent(user -> {
                        if (request.getName() != null) {
                            user.setName(request.getName());
                        }
                        if (request.getEmail() != null) {
                            user.setEmail(request.getEmail());
                        }
                        userService.updateUser(currentUser.getId(), user);
                    });
        }
        
        // Update profile data
        return companyProfileService.getProfileByUserId(currentUser.getId())
                .map(profile -> {
                    if (request.getWebsite() != null) {
                        profile.setWebsite(request.getWebsite());
                    }
                    if (request.getIndustry() != null) {
                        profile.setIndustry(request.getIndustry());
                    }
                    if (request.getDescription() != null) {
                        profile.setDescription(request.getDescription());
                    }
                    if (request.getLocation() != null) {
                        profile.setLocation(request.getLocation());
                    }
                    if (request.getSize() != null) {
                        profile.setSize(request.getSize());
                    }
                    
                    CompanyProfile updatedProfile = companyProfileService.updateProfile(profile.getId(), profile)
                            .orElse(profile);
                    
                    return ResponseEntity.ok(Map.of(
                            "message", "Profile updated successfully",
                            "profile", updatedProfile
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Data
    public static class UpdateInfluencerProfileRequest {
        private String name;
        private String email;
        private String bio;
        private String location;
        private List<String> categories;
        private String priceRange;
    }

    @Data
    public static class UpdateCompanyProfileRequest {
        private String name;
        private String email;
        private String website;
        private String industry;
        private String description;
        private String location;
        private String size;
    }
}

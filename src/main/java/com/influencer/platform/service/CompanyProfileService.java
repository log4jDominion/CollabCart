package com.influencer.platform.service;

import com.influencer.platform.model.CompanyProfile;
import com.influencer.platform.model.User;
import com.influencer.platform.repository.CompanyProfileRepository;
import com.influencer.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CompanyProfileService {
    private final CompanyProfileRepository companyProfileRepository;
    private final UserRepository userRepository;

    public CompanyProfileService(CompanyProfileRepository companyProfileRepository, UserRepository userRepository) {
        this.companyProfileRepository = companyProfileRepository;
        this.userRepository = userRepository;
    }

    public List<CompanyProfile> getAllProfiles() {
        return companyProfileRepository.findAll();
    }

    public Optional<CompanyProfile> getProfileById(String id) {
        return companyProfileRepository.findById(id);
    }

    public Optional<CompanyProfile> getProfileByUserId(String userId) {
        return companyProfileRepository.findByUserId(userId);
    }

    public CompanyProfile createProfile(CompanyProfile profile) {
        LocalDateTime now = LocalDateTime.now();
        profile.setCreatedAt(now);
        profile.setUpdatedAt(now);
        return companyProfileRepository.save(profile);
    }

    public Optional<CompanyProfile> updateProfile(String id, CompanyProfile profileDetails) {
        return companyProfileRepository.findById(id)
                .map(existingProfile -> {
                    // Update fields
                    if (profileDetails.getWebsite() != null) {
                        existingProfile.setWebsite(profileDetails.getWebsite());
                    }
                    if (profileDetails.getIndustry() != null) {
                        existingProfile.setIndustry(profileDetails.getIndustry());
                    }
                    if (profileDetails.getDescription() != null) {
                        existingProfile.setDescription(profileDetails.getDescription());
                    }
                    if (profileDetails.getLocation() != null) {
                        existingProfile.setLocation(profileDetails.getLocation());
                    }
                    if (profileDetails.getSize() != null) {
                        existingProfile.setSize(profileDetails.getSize());
                    }
                    
                    existingProfile.setUpdatedAt(LocalDateTime.now());
                    return companyProfileRepository.save(existingProfile);
                });
    }

    public boolean deleteProfile(String id) {
        return companyProfileRepository.deleteById(id);
    }

    public Map<String, Object> getCompanyWithDetails(String companyId) {
        Optional<CompanyProfile> profileOpt = companyProfileRepository.findById(companyId);
        
        if (profileOpt.isEmpty()) {
            return null;
        }
        
        CompanyProfile profile = profileOpt.get();
        User user = userRepository.findById(profile.getUserId()).orElse(null);
        
        if (user == null) {
            return null;
        }
        
        return Map.of(
                "id", profile.getId(),
                "website", profile.getWebsite(),
                "industry", profile.getIndustry(),
                "description", profile.getDescription(),
                "location", profile.getLocation(),
                "size", profile.getSize(),
                "user", Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail()
                )
        );
    }
}

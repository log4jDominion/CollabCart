package com.influencer.platform.service;

import com.influencer.platform.model.InfluencerProfile;
import com.influencer.platform.model.SocialAccount;
import com.influencer.platform.model.User;
import com.influencer.platform.repository.InfluencerProfileRepository;
import com.influencer.platform.repository.SocialAccountRepository;
import com.influencer.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InfluencerProfileService {
    private final InfluencerProfileRepository influencerProfileRepository;
    private final UserRepository userRepository;
    private final SocialAccountRepository socialAccountRepository;

    public InfluencerProfileService(
            InfluencerProfileRepository influencerProfileRepository,
            UserRepository userRepository,
            SocialAccountRepository socialAccountRepository) {
        this.influencerProfileRepository = influencerProfileRepository;
        this.userRepository = userRepository;
        this.socialAccountRepository = socialAccountRepository;
    }

    public List<InfluencerProfile> getAllProfiles() {
        return influencerProfileRepository.findAll();
    }

    public Optional<InfluencerProfile> getProfileById(String id) {
        return influencerProfileRepository.findById(id);
    }

    public Optional<InfluencerProfile> getProfileByUserId(String userId) {
        return influencerProfileRepository.findByUserId(userId);
    }

    public InfluencerProfile createProfile(InfluencerProfile profile) {
        LocalDateTime now = LocalDateTime.now();
        profile.setCreatedAt(now);
        profile.setUpdatedAt(now);
        return influencerProfileRepository.save(profile);
    }

    public Optional<InfluencerProfile> updateProfile(String id, InfluencerProfile profileDetails) {
        return influencerProfileRepository.findById(id)
                .map(existingProfile -> {
                    // Update fields
                    if (profileDetails.getBio() != null) {
                        existingProfile.setBio(profileDetails.getBio());
                    }
                    if (profileDetails.getLocation() != null) {
                        existingProfile.setLocation(profileDetails.getLocation());
                    }
                    if (profileDetails.getCategories() != null) {
                        existingProfile.setCategories(profileDetails.getCategories());
                    }
                    if (profileDetails.getPriceRange() != null) {
                        existingProfile.setPriceRange(profileDetails.getPriceRange());
                    }
                    
                    existingProfile.setUpdatedAt(LocalDateTime.now());
                    return influencerProfileRepository.save(existingProfile);
                });
    }

    public boolean deleteProfile(String id) {
        return influencerProfileRepository.deleteById(id);
    }

    public List<Map<String, Object>> getInfluencersWithDetails(String category, String location, Integer minFollowers, Integer maxFollowers, boolean anonymized) {
        List<InfluencerProfile> profiles = influencerProfileRepository.findAll();
        
        // Filter by category if provided
        if (category != null && !category.isEmpty()) {
            profiles = profiles.stream()
                    .filter(profile -> profile.getCategories() != null && profile.getCategories().contains(category))
                    .collect(Collectors.toList());
        }
        
        // Filter by location if provided
        if (location != null && !location.isEmpty()) {
            profiles = profiles.stream()
                    .filter(profile -> profile.getLocation() != null && 
                            profile.getLocation().toLowerCase().contains(location.toLowerCase()))
                    .collect(Collectors.toList());
        }
        
        // Get full details for each profile
        return profiles.stream()
                .map(profile -> {
                    User user = userRepository.findById(profile.getUserId()).orElse(null);
                    List<SocialAccount> socialAccounts = socialAccountRepository.findByInfluencerId(profile.getId());
                    
                    // Calculate total followers
                    int totalFollowers = socialAccounts.stream()
                            .mapToInt(SocialAccount::getFollowers)
                            .sum();
                    
                    // Filter by follower count if provided
                    if ((minFollowers != null && totalFollowers < minFollowers) ||
                            (maxFollowers != null && totalFollowers > maxFollowers)) {
                        return null;
                    }
                    
                    // Create result map
                    Map<String, Object> result = Map.of(
                            "id", profile.getId(),
                            "categories", profile.getCategories(),
                            "location", profile.getLocation(),
                            "priceRange", profile.getPriceRange(),
                            "totalFollowers", totalFollowers,
                            "socialAccounts", anonymized ? 
                                    socialAccounts.stream()
                                            .map(account -> Map.of(
                                                    "platform", account.getPlatform(),
                                                    "followers", account.getFollowers(),
                                                    "engagement", account.getEngagement()
                                            ))
                                            .collect(Collectors.toList()) :
                                    socialAccounts
                    );
                    
                    // Add user details if not anonymized
                    if (!anonymized && user != null) {
                        result.put("user", Map.of(
                                "id", user.getId(),
                                "name", user.getName(),
                                "email", user.getEmail()
                        ));
                        result.put("bio", profile.getBio());
                    }
                    
                    return result;
                })
                .filter(result -> result != null)
                .collect(Collectors.toList());
    }

    public Map<String, Object> getInfluencerWithDetails(String id, boolean anonimyzed) {
        Optional<InfluencerProfile> profileOptional = influencerProfileRepository.findById(id);

        if(profileOptional.isEmpty()) return null;

        return Map.of(id, profileOptional.get());
    }
}

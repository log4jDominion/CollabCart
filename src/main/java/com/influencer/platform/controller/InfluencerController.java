package com.influencer.platform.controller;

import com.influencer.platform.model.InfluencerProfile;
import com.influencer.platform.security.UserPrincipal;
import com.influencer.platform.service.InfluencerProfileService;
import com.influencer.platform.service.ProfileUnlockService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/influencers")
public class InfluencerController {
    private final InfluencerProfileService influencerProfileService;
    private final ProfileUnlockService profileUnlockService;

    public InfluencerController(
            InfluencerProfileService influencerProfileService,
            ProfileUnlockService profileUnlockService) {
        this.influencerProfileService = influencerProfileService;
        this.profileUnlockService = profileUnlockService;
    }

    @GetMapping
    public ResponseEntity<?> getInfluencers(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer minFollowers,
            @RequestParam(required = false) Integer maxFollowers,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        boolean isCompany = "COMPANY".equalsIgnoreCase(currentUser.getUserType());
        
        List<Map<String, Object>> influencers = influencerProfileService.getInfluencersWithDetails(
                category, location, minFollowers, maxFollowers, 
                !isCompany
        );
        
        return ResponseEntity.ok(influencers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInfluencer(
            @PathVariable String id,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        return influencerProfileService.getProfileById(id)
                .map(profile -> {
                    boolean isCompany = "COMPANY".equalsIgnoreCase(currentUser.getUserType());
                    boolean isAnonymized = isCompany && 
                            !profileUnlockService.hasCompanyUnlockedInfluencer(currentUser.getId(), id);
                    
                    Map<String, Object> influencer = influencerProfileService.getInfluencerWithDetails(
                            id, isAnonymized);
                    
                    return ResponseEntity.ok(influencer);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

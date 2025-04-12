package com.influencer.platform.controller;

import com.influencer.platform.model.InfluencerProfile;
import com.influencer.platform.security.UserPrincipal;
import com.influencer.platform.service.InfluencerProfileService;
import com.influencer.platform.service.ProfileUnlockService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/unlock")
public class UnlockController {
    private final ProfileUnlockService profileUnlockService;
    private final InfluencerProfileService influencerProfileService;

    public UnlockController(
            ProfileUnlockService profileUnlockService,
            InfluencerProfileService influencerProfileService) {
        this.profileUnlockService = profileUnlockService;
        this.influencerProfileService = influencerProfileService;
    }

    @PostMapping
    public ResponseEntity<?> unlockProfile(
            @RequestBody UnlockRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        if (!"COMPANY".equalsIgnoreCase(currentUser.getUserType())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only companies can unlock influencer profiles"));
        }
        
        // Check if profile exists
        if (influencerProfileService.getProfileById(request.getInfluencerId()).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Check if already unlocked
        if (profileUnlockService.hasCompanyUnlockedInfluencer(currentUser.getId(), request.getInfluencerId())) {
            return ResponseEntity.ok(Map.of(
                    "message", "Profile already unlocked",
                    "influencer", influencerProfileService.getInfluencerWithDetails(request.getInfluencerId(), false)
            ));
        }
        
        // Create unlock record
        profileUnlockService.createUnlock(currentUser.getId(), request.getInfluencerId(), request.getPaymentIntentId());
        
        // Get full influencer profile
        Map<String, Object> influencer = influencerProfileService.getInfluencerWithDetails(request.getInfluencerId(), false);
        
        return ResponseEntity.ok(Map.of(
                "message", "Influencer profile unlocked successfully",
                "influencer", influencer
        ));
    }

    @Data
    public static class UnlockRequest {
        private String influencerId;
        private String paymentIntentId;
    }
}

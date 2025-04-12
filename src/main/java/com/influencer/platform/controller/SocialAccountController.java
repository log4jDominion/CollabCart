package com.influencer.platform.controller;

import com.influencer.platform.model.SocialAccount;
import com.influencer.platform.security.UserPrincipal;
import com.influencer.platform.service.SocialAccountService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/social-accounts")
public class SocialAccountController {
    private final SocialAccountService socialAccountService;

    public SocialAccountController(SocialAccountService socialAccountService) {
        this.socialAccountService = socialAccountService;
    }

    @GetMapping
    public ResponseEntity<?> getSocialAccounts(@AuthenticationPrincipal UserPrincipal currentUser) {
        if (!"INFLUENCER".equalsIgnoreCase(currentUser.getUserType())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only influencers can access social accounts"));
        }
        
        List<SocialAccount> accounts = socialAccountService.getAccountsByInfluencerId(currentUser.getId());
        return ResponseEntity.ok(accounts);
    }

    @PostMapping
    public ResponseEntity<?> addSocialAccount(
            @RequestBody SocialAccountRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        if (!"INFLUENCER".equalsIgnoreCase(currentUser.getUserType())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only influencers can add social accounts"));
        }
        
        SocialAccount account = new SocialAccount();
        account.setPlatform(request.getPlatform());
        account.setUsername(request.getUsername());
        account.setProfileUrl(request.getProfileUrl());
        account.setFollowers(request.getFollowers());
        account.setEngagement(request.getEngagement());
        
        return socialAccountService.createOrUpdateAccount(currentUser.getId(), account)
                .map(savedAccount -> {
                    String message = "Social account added successfully";
                    if (savedAccount.getId() != null) {
                        message = "Social account updated successfully";
                    }
                    
                    return ResponseEntity.ok(Map.of(
                            "message", message,
                            "account", savedAccount
                    ));
                })
                .orElse(ResponseEntity.status(500).body(Map.of("error", "Failed to save social account")));
    }

    @Data
    public static class SocialAccountRequest {
        private String platform;
        private String username;
        private String profileUrl;
        private int followers;
        private double engagement;
    }
}

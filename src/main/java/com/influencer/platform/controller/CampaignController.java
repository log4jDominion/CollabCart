package com.influencer.platform.controller;

import com.influencer.platform.model.Campaign;
import com.influencer.platform.security.UserPrincipal;
import com.influencer.platform.service.CampaignService;
import com.influencer.platform.service.CompanyProfileService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/campaigns")
public class CampaignController {
    private final CampaignService campaignService;
    private final CompanyProfileService companyProfileService;

    public CampaignController(CampaignService campaignService, CompanyProfileService companyProfileService) {
        this.campaignService = campaignService;
        this.companyProfileService = companyProfileService;
    }

    @GetMapping
    public ResponseEntity<?> getCampaigns(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<Campaign> campaigns;
        
        if ("COMPANY".equalsIgnoreCase(currentUser.getUserType())) {
            campaigns = campaignService.getCampaignsByCompanyId(currentUser.getId());
        } else if ("INFLUENCER".equalsIgnoreCase(currentUser.getUserType())) {
            campaigns = campaignService.getCampaignsForInfluencer(currentUser.getId());
            
            // Add company data to each campaign
            List<Map<String, Object>> campaignsWithCompany = campaigns.stream()
                    .map(campaign -> {
                        Map<String, Object> companyData = companyProfileService.getCompanyWithDetails(campaign.getCompanyId());
                        return Map.of(
                                "campaign", campaign,
                                "company", companyData != null ? companyData : Map.of()
                        );
                    })
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(campaignsWithCompany);
        } else {
            return ResponseEntity.status(400).body(Map.of("error", "Invalid user type"));
        }
        
        return ResponseEntity.ok(campaigns);
    }

    @PostMapping
    public ResponseEntity<?> createCampaign(
            @RequestBody CampaignRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        if (!"COMPANY".equalsIgnoreCase(currentUser.getUserType())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only companies can create campaigns"));
        }
        
        Campaign campaign = new Campaign();
        campaign.setCompanyId(currentUser.getId());
        campaign.setName(request.getName());
        campaign.setDescription(request.getDescription());
        campaign.setCategory(request.getCategory());
        campaign.setBudget(request.getBudget());
        campaign.setTargetAudience(request.getTargetAudience());
        campaign.setTargetLocation(request.getTargetLocation());
        campaign.setStartDate(LocalDate.parse(request.getStartDate()));
        campaign.setEndDate(LocalDate.parse(request.getEndDate()));
        campaign.setInfluencers(new ArrayList<>());
        
        Campaign createdCampaign = campaignService.createCampaign(campaign);
        
        return ResponseEntity.status(201).body(Map.of(
                "message", "Campaign created successfully",
                "campaign", createdCampaign
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCampaign(
            @PathVariable String id,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        return campaignService.getCampaignById(id)
                .map(campaign -> {
                    // Check if user has access to this campaign
                    if ("COMPANY".equalsIgnoreCase(currentUser.getUserType()) && 
                            !campaign.getCompanyId().equals(currentUser.getId())) {
                        return ResponseEntity.status(403).body(Map.of("error", "You don't have access to this campaign"));
                    }
                    
                    if ("INFLUENCER".equalsIgnoreCase(currentUser.getUserType()) && 
                            (campaign.getInfluencers() == null || !campaign.getInfluencers().contains(currentUser.getId()))) {
                        return ResponseEntity.status(403).body(Map.of("error", "You don't have access to this campaign"));
                    }
                    
                    return ResponseEntity.ok(campaign);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCampaign(
            @PathVariable String id,
            @RequestBody CampaignRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        return campaignService.getCampaignById(id)
                .map(campaign -> {
                    // Check if user is the owner of this campaign
                    if (!"COMPANY".equalsIgnoreCase(currentUser.getUserType()) || 
                            !campaign.getCompanyId().equals(currentUser.getId())) {
                        return ResponseEntity.status(403).body(Map.of("error", "Only the campaign owner can update it"));
                    }
                    
                    if (request.getName() != null) {
                        campaign.setName(request.getName());
                    }
                    if (request.getDescription() != null) {
                        campaign.setDescription(request.getDescription());
                    }
                    if (request.getCategory() != null) {
                        campaign.setCategory(request.getCategory());
                    }
                    if (request.getBudget() != null) {
                        campaign.setBudget(request.getBudget());
                    }
                    if (request.getTargetAudience() != null) {
                        campaign.setTargetAudience(request.getTargetAudience());
                    }
                    if (request.getTargetLocation() != null) {
                        campaign.setTargetLocation(request.getTargetLocation());
                    }
                    if (request.getStartDate() != null) {
                        campaign.setStartDate(LocalDate.parse(request.getStartDate()));
                    }
                    if (request.getEndDate() != null) {
                        campaign.setEndDate(LocalDate.parse(request.getEndDate()));
                    }
                    
                    Campaign updatedCampaign = campaignService.updateCampaign(id, campaign)
                            .orElse(campaign);
                    
                    return ResponseEntity.ok(Map.of(
                            "message", "Campaign updated successfully",
                            "campaign", updatedCampaign
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/influencers/{influencerId}")
    public ResponseEntity<?> addInfluencerToCampaign(
            @PathVariable String id,
            @PathVariable String influencerId,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        return campaignService.getCampaignById(id)
                .map(campaign -> {
                    // Check if user is the owner of this campaign
                    if (!"COMPANY".equalsIgnoreCase(currentUser.getUserType()) || 
                            !campaign.getCompanyId().equals(currentUser.getId())) {
                        return ResponseEntity.status(403).body(Map.of("error", "Only the campaign owner can add influencers"));
                    }
                    
                    Campaign updatedCampaign = campaignService.addInfluencerToCampaign(id, influencerId)
                            .orElse(campaign);
                    
                    return ResponseEntity.ok(Map.of(
                            "message", "Influencer added to campaign successfully",
                            "campaign", updatedCampaign
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/influencers/{influencerId}")
    public ResponseEntity<?> removeInfluencerFromCampaign(
            @PathVariable String id,
            @PathVariable String influencerId,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        return campaignService.getCampaignById(id)
                .map(campaign -> {
                    // Check if user is the owner of this campaign
                    if (!"COMPANY".equalsIgnoreCase(currentUser.getUserType()) || 
                            !campaign.getCompanyId().equals(currentUser.getId())) {
                        return ResponseEntity.status(403).body(Map.of("error", "Only the campaign owner can remove influencers"));
                    }
                    
                    Campaign updatedCampaign = campaignService.removeInfluencerFromCampaign(id, influencerId)
                            .orElse(campaign);
                    
                    return ResponseEntity.ok(Map.of(
                            "message", "Influencer removed from campaign successfully",
                            "campaign", updatedCampaign
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Data
    public static class CampaignRequest {
        private String name;
        private String description;
        private String category;
        private String budget;
        private String targetAudience;
        private String targetLocation;
        private String startDate;
        private String endDate;
    }
}

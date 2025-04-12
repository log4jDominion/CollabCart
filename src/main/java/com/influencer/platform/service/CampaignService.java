package com.influencer.platform.service;

import com.influencer.platform.model.Campaign;
import com.influencer.platform.repository.CampaignRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CampaignService {
    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Optional<Campaign> getCampaignById(String id) {
        return campaignRepository.findById(id);
    }

    public List<Campaign> getCampaignsByCompanyId(String companyId) {
        return campaignRepository.findByCompanyId(companyId);
    }

    public List<Campaign> getCampaignsForInfluencer(String influencerId) {
        return campaignRepository.findByInfluencerId(influencerId);
    }

    public Campaign createCampaign(Campaign campaign) {
        LocalDateTime now = LocalDateTime.now();
        campaign.setCreatedAt(now);
        campaign.setUpdatedAt(now);
        return campaignRepository.save(campaign);
    }

    public Optional<Campaign> updateCampaign(String id, Campaign campaignDetails) {
        return campaignRepository.findById(id)
                .map(existingCampaign -> {
                    // Update fields
                    if (campaignDetails.getName() != null) {
                        existingCampaign.setName(campaignDetails.getName());
                    }
                    if (campaignDetails.getDescription() != null) {
                        existingCampaign.setDescription(campaignDetails.getDescription());
                    }
                    if (campaignDetails.getCategory() != null) {
                        existingCampaign.setCategory(campaignDetails.getCategory());
                    }
                    if (campaignDetails.getBudget() != null) {
                        existingCampaign.setBudget(campaignDetails.getBudget());
                    }
                    if (campaignDetails.getTargetAudience() != null) {
                        existingCampaign.setTargetAudience(campaignDetails.getTargetAudience());
                    }
                    if (campaignDetails.getTargetLocation() != null) {
                        existingCampaign.setTargetLocation(campaignDetails.getTargetLocation());
                    }
                    if (campaignDetails.getStartDate() != null) {
                        existingCampaign.setStartDate(campaignDetails.getStartDate());
                    }
                    if (campaignDetails.getEndDate() != null) {
                        existingCampaign.setEndDate(campaignDetails.getEndDate());
                    }
                    if (campaignDetails.getInfluencers() != null) {
                        existingCampaign.setInfluencers(campaignDetails.getInfluencers());
                    }
                    
                    existingCampaign.setUpdatedAt(LocalDateTime.now());
                    return campaignRepository.save(existingCampaign);
                });
    }

    public boolean deleteCampaign(String id) {
        return campaignRepository.deleteById(id);
    }

    public Optional<Campaign> addInfluencerToCampaign(String campaignId, String influencerId) {
        return campaignRepository.findById(campaignId)
                .map(campaign -> {
                    if (campaign.getInfluencers() == null || !campaign.getInfluencers().contains(influencerId)) {
                        campaign.getInfluencers().add(influencerId);
                        campaign.setUpdatedAt(LocalDateTime.now());
                        return campaignRepository.save(campaign);
                    }
                    return campaign;
                });
    }

    public Optional<Campaign> removeInfluencerFromCampaign(String campaignId, String influencerId) {
        return campaignRepository.findById(campaignId)
                .map(campaign -> {
                    if (campaign.getInfluencers() != null && campaign.getInfluencers().contains(influencerId)) {
                        campaign.getInfluencers().remove(influencerId);
                        campaign.setUpdatedAt(LocalDateTime.now());
                        return campaignRepository.save(campaign);
                    }
                    return campaign;
                });
    }
}

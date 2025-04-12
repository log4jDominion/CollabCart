package com.influencer.platform.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.influencer.platform.model.Campaign;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class CampaignRepository {
    private static final String CAMPAIGNS_FILE = "campaigns.json";
    private final JsonFileRepository jsonFileRepository;
    private final TypeReference<List<Campaign>> typeReference = new TypeReference<>() {};

    public CampaignRepository(JsonFileRepository jsonFileRepository) {
        this.jsonFileRepository = jsonFileRepository;
    }

    public List<Campaign> findAll() {
        return jsonFileRepository.findAll(CAMPAIGNS_FILE, typeReference);
    }

    public Optional<Campaign> findById(String id) {
        return Optional.ofNullable(jsonFileRepository.findById(CAMPAIGNS_FILE, typeReference, id, Campaign::getId));
    }

    public List<Campaign> findByCompanyId(String companyId) {
        return jsonFileRepository.findByPredicate(
                CAMPAIGNS_FILE, 
                typeReference, 
                campaign -> campaign.getCompanyId().equals(companyId)
        );
    }

    public List<Campaign> findByInfluencerId(String influencerId) {
        return jsonFileRepository.findByPredicate(
                CAMPAIGNS_FILE, 
                typeReference, 
                campaign -> campaign.getInfluencers() != null && campaign.getInfluencers().contains(influencerId)
        );
    }

    public Campaign save(Campaign campaign) {
        if (campaign.getId() == null) {
            campaign.setId(UUID.randomUUID().toString());
        }
        return jsonFileRepository.save(CAMPAIGNS_FILE, typeReference, campaign, Campaign::getId);
    }

    public boolean deleteById(String id) {
        return jsonFileRepository.deleteById(CAMPAIGNS_FILE, typeReference, id, Campaign::getId);
    }
}

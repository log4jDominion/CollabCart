package com.influencer.platform.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.influencer.platform.model.InfluencerProfile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class InfluencerProfileRepository {
    private static final String PROFILES_FILE = "influencer-profiles.json";
    private final JsonFileRepository jsonFileRepository;
    private final TypeReference<List<InfluencerProfile>> typeReference = new TypeReference<>() {};

    public InfluencerProfileRepository(JsonFileRepository jsonFileRepository) {
        this.jsonFileRepository = jsonFileRepository;
    }

    public List<InfluencerProfile> findAll() {
        return jsonFileRepository.findAll(PROFILES_FILE, typeReference);
    }

    public Optional<InfluencerProfile> findById(String id) {
        return Optional.ofNullable(jsonFileRepository.findById(PROFILES_FILE, typeReference, id, InfluencerProfile::getId));
    }

    public Optional<InfluencerProfile> findByUserId(String userId) {
        List<InfluencerProfile> profiles = jsonFileRepository.findByPredicate(
                PROFILES_FILE, 
                typeReference, 
                profile -> profile.getUserId().equals(userId)
        );
        return profiles.isEmpty() ? Optional.empty() : Optional.of(profiles.get(0));
    }

    public InfluencerProfile save(InfluencerProfile profile) {
        if (profile.getId() == null) {
            profile.setId(UUID.randomUUID().toString());
        }
        return jsonFileRepository.save(PROFILES_FILE, typeReference, profile, InfluencerProfile::getId);
    }

    public boolean deleteById(String id) {
        return jsonFileRepository.deleteById(PROFILES_FILE, typeReference, id, InfluencerProfile::getId);
    }
}

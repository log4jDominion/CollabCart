package com.influencer.platform.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.influencer.platform.model.CompanyProfile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class CompanyProfileRepository {
    private static final String PROFILES_FILE = "company-profiles.json";
    private final JsonFileRepository jsonFileRepository;
    private final TypeReference<List<CompanyProfile>> typeReference = new TypeReference<>() {};

    public CompanyProfileRepository(JsonFileRepository jsonFileRepository) {
        this.jsonFileRepository = jsonFileRepository;
    }

    public List<CompanyProfile> findAll() {
        return jsonFileRepository.findAll(PROFILES_FILE, typeReference);
    }

    public Optional<CompanyProfile> findById(String id) {
        return Optional.ofNullable(jsonFileRepository.findById(PROFILES_FILE, typeReference, id, CompanyProfile::getId));
    }

    public Optional<CompanyProfile> findByUserId(String userId) {
        List<CompanyProfile> profiles = jsonFileRepository.findByPredicate(
                PROFILES_FILE, 
                typeReference, 
                profile -> profile.getUserId().equals(userId)
        );
        return profiles.isEmpty() ? Optional.empty() : Optional.of(profiles.get(0));
    }

    public CompanyProfile save(CompanyProfile profile) {
        if (profile.getId() == null) {
            profile.setId(UUID.randomUUID().toString());
        }
        return jsonFileRepository.save(PROFILES_FILE, typeReference, profile, CompanyProfile::getId);
    }

    public boolean deleteById(String id) {
        return jsonFileRepository.deleteById(PROFILES_FILE, typeReference, id, CompanyProfile::getId);
    }
}

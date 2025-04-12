package com.influencer.platform.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.influencer.platform.model.ProfileUnlock;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class ProfileUnlockRepository {
    private static final String UNLOCKS_FILE = "profile-unlocks.json";
    private final JsonFileRepository jsonFileRepository;
    private final TypeReference<List<ProfileUnlock>> typeReference = new TypeReference<>() {};

    public ProfileUnlockRepository(JsonFileRepository jsonFileRepository) {
        this.jsonFileRepository = jsonFileRepository;
    }

    public List<ProfileUnlock> findAll() {
        return jsonFileRepository.findAll(UNLOCKS_FILE, typeReference);
    }

    public Optional<ProfileUnlock> findById(String id) {
        return Optional.ofNullable(jsonFileRepository.findById(UNLOCKS_FILE, typeReference, id, ProfileUnlock::getId));
    }

    public List<ProfileUnlock> findByCompanyId(String companyId) {
        return jsonFileRepository.findByPredicate(
                UNLOCKS_FILE, 
                typeReference, 
                unlock -> unlock.getCompanyId().equals(companyId)
        );
    }

    public boolean hasCompanyUnlockedInfluencer(String companyId, String influencerId) {
        List<ProfileUnlock> unlocks = jsonFileRepository.findByPredicate(
                UNLOCKS_FILE, 
                typeReference, 
                unlock -> unlock.getCompanyId().equals(companyId) && unlock.getInfluencerId().equals(influencerId)
        );
        return !unlocks.isEmpty();
    }

    public ProfileUnlock save(ProfileUnlock unlock) {
        if (unlock.getId() == null) {
            unlock.setId(UUID.randomUUID().toString());
        }
        return jsonFileRepository.save(UNLOCKS_FILE, typeReference, unlock, ProfileUnlock::getId);
    }

    public boolean deleteById(String id) {
        return jsonFileRepository.deleteById(UNLOCKS_FILE, typeReference, id, ProfileUnlock::getId);
    }
}

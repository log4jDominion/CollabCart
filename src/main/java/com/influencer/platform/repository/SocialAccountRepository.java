package com.influencer.platform.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.influencer.platform.model.SocialAccount;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class SocialAccountRepository {
    private static final String ACCOUNTS_FILE = "social-accounts.json";
    private final JsonFileRepository jsonFileRepository;
    private final TypeReference<List<SocialAccount>> typeReference = new TypeReference<>() {};

    public SocialAccountRepository(JsonFileRepository jsonFileRepository) {
        this.jsonFileRepository = jsonFileRepository;
    }

    public List<SocialAccount> findAll() {
        return jsonFileRepository.findAll(ACCOUNTS_FILE, typeReference);
    }

    public Optional<SocialAccount> findById(String id) {
        return Optional.ofNullable(jsonFileRepository.findById(ACCOUNTS_FILE, typeReference, id, SocialAccount::getId));
    }

    public List<SocialAccount> findByInfluencerId(String influencerId) {
        return jsonFileRepository.findByPredicate(
                ACCOUNTS_FILE, 
                typeReference, 
                account -> account.getInfluencerId().equals(influencerId)
        );
    }

    public Optional<SocialAccount> findByInfluencerIdAndPlatform(String influencerId, String platform) {
        List<SocialAccount> accounts = jsonFileRepository.findByPredicate(
                ACCOUNTS_FILE, 
                typeReference, 
                account -> account.getInfluencerId().equals(influencerId) && account.getPlatform().equals(platform)
        );
        return accounts.isEmpty() ? Optional.empty() : Optional.of(accounts.get(0));
    }

    public SocialAccount save(SocialAccount account) {
        if (account.getId() == null) {
            account.setId(UUID.randomUUID().toString());
        }
        return jsonFileRepository.save(ACCOUNTS_FILE, typeReference, account, SocialAccount::getId);
    }

    public boolean deleteById(String id) {
        return jsonFileRepository.deleteById(ACCOUNTS_FILE, typeReference, id, SocialAccount::getId);
    }
}

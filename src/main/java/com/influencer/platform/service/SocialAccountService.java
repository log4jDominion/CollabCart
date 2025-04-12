package com.influencer.platform.service;

import com.influencer.platform.model.SocialAccount;
import com.influencer.platform.repository.SocialAccountRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SocialAccountService {
    private final SocialAccountRepository socialAccountRepository;

    public SocialAccountService(SocialAccountRepository socialAccountRepository) {
        this.socialAccountRepository = socialAccountRepository;
    }

    public List<SocialAccount> getAllAccounts() {
        return socialAccountRepository.findAll();
    }

    public Optional<SocialAccount> getAccountById(String id) {
        return socialAccountRepository.findById(id);
    }

    public List<SocialAccount> getAccountsByInfluencerId(String influencerId) {
        return socialAccountRepository.findByInfluencerId(influencerId);
    }

    public SocialAccount createAccount(SocialAccount account) {
        LocalDateTime now = LocalDateTime.now();
        account.setCreatedAt(now);
        account.setUpdatedAt(now);
        return socialAccountRepository.save(account);
    }

    public Optional<SocialAccount> updateAccount(String id, SocialAccount accountDetails) {
        return socialAccountRepository.findById(id)
                .map(existingAccount -> {
                    // Update fields
                    if (accountDetails.getUsername() != null) {
                        existingAccount.setUsername(accountDetails.getUsername());
                    }
                    if (accountDetails.getProfileUrl() != null) {
                        existingAccount.setProfileUrl(accountDetails.getProfileUrl());
                    }
                    if (accountDetails.getFollowers() > 0) {
                        existingAccount.setFollowers(accountDetails.getFollowers());
                    }
                    if (accountDetails.getEngagement() > 0) {
                        existingAccount.setEngagement(accountDetails.getEngagement());
                    }
                    
                    existingAccount.setUpdatedAt(LocalDateTime.now());
                    return socialAccountRepository.save(existingAccount);
                });
    }

    public Optional<SocialAccount> createOrUpdateAccount(String influencerId, SocialAccount accountDetails) {
        // Check if account already exists for this platform
        Optional<SocialAccount> existingAccount = socialAccountRepository.findByInfluencerIdAndPlatform(
                influencerId, accountDetails.getPlatform());
        
        if (existingAccount.isPresent()) {
            // Update existing account
            return updateAccount(existingAccount.get().getId(), accountDetails);
        } else {
            // Create new account
            accountDetails.setInfluencerId(influencerId);
            return Optional.of(createAccount(accountDetails));
        }
    }

    public boolean deleteAccount(String id) {
        return socialAccountRepository.deleteById(id);
    }
}

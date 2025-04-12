package com.influencer.platform.service;

import com.influencer.platform.model.ProfileUnlock;
import com.influencer.platform.repository.ProfileUnlockRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileUnlockService {
    private final ProfileUnlockRepository profileUnlockRepository;

    public ProfileUnlockService(ProfileUnlockRepository profileUnlockRepository) {
        this.profileUnlockRepository = profileUnlockRepository;
    }

    public List<ProfileUnlock> getAllUnlocks() {
        return profileUnlockRepository.findAll();
    }

    public Optional<ProfileUnlock> getUnlockById(String id) {
        return profileUnlockRepository.findById(id);
    }

    public List<ProfileUnlock> getUnlocksByCompanyId(String companyId) {
        return profileUnlockRepository.findByCompanyId(companyId);
    }

    public boolean hasCompanyUnlockedInfluencer(String companyId, String influencerId) {
        return profileUnlockRepository.hasCompanyUnlockedInfluencer(companyId, influencerId);
    }

    public ProfileUnlock createUnlock(String companyId, String influencerId, String paymentIntentId) {
        ProfileUnlock unlock = new ProfileUnlock();
        unlock.setCompanyId(companyId);
        unlock.setInfluencerId(influencerId);
        unlock.setPaymentIntentId(paymentIntentId);
        unlock.setUnlockDate(LocalDateTime.now());
        
        return profileUnlockRepository.save(unlock);
    }

    public boolean deleteUnlock(String id) {
        return profileUnlockRepository.deleteById(id);
    }
}

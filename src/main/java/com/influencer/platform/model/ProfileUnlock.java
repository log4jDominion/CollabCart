package com.influencer.platform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUnlock {
    private String id;
    private String companyId;
    private String influencerId;
    private String paymentIntentId;
    private LocalDateTime unlockDate;
}

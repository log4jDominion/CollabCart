package com.influencer.platform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InfluencerProfile {
    private String id;
    private String userId;
    private String bio;
    private String location;
    private List<String> categories;
    private String priceRange;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.influencer.platform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {
    private String id;
    private String companyId;
    private String name;
    private String description;
    private String category;
    private String budget;
    private String targetAudience;
    private String targetLocation;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> influencers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

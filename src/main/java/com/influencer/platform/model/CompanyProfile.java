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
public class CompanyProfile {
    private String id;
    private String userId;
    private String website;
    private String industry;
    private String description;
    private String location;
    private String size;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

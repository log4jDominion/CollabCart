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
public class SocialAccount {
    private String id;
    private String influencerId;
    private String platform;
    private String username;
    private String profileUrl;
    private int followers;
    private double engagement;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

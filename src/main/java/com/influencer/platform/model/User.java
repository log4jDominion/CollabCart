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
public class User {
    private String id;
    private String name;
    private String email;
    private String password;
    private UserType userType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum UserType {
        INFLUENCER, COMPANY
    }
}

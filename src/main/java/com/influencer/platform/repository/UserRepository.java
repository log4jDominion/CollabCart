package com.influencer.platform.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.influencer.platform.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class UserRepository {
    private static final String USERS_FILE = "users.json";
    private final JsonFileRepository jsonFileRepository;
    private final TypeReference<List<User>> typeReference = new TypeReference<>() {};

    public UserRepository(JsonFileRepository jsonFileRepository) {
        this.jsonFileRepository = jsonFileRepository;
    }

    public List<User> findAll() {
        return jsonFileRepository.findAll(USERS_FILE, typeReference);
    }

    public Optional<User> findById(String id) {
        return Optional.ofNullable(jsonFileRepository.findById(USERS_FILE, typeReference, id, User::getId));
    }

    public Optional<User> findByEmail(String email) {
        List<User> users = jsonFileRepository.findByPredicate(
                USERS_FILE, 
                typeReference, 
                user -> user.getEmail().equalsIgnoreCase(email)
        );
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    public User save(User user) {
        if (user.getId() == null) {
            user.setId(UUID.randomUUID().toString());
        }
        return jsonFileRepository.save(USERS_FILE, typeReference, user, User::getId);
    }

    public boolean deleteById(String id) {
        return jsonFileRepository.deleteById(USERS_FILE, typeReference, id, User::getId);
    }
}

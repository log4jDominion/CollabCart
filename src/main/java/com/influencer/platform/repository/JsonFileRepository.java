package com.influencer.platform.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Slf4j
@Component
public class JsonFileRepository {
    private final ObjectMapper objectMapper;
    private final String dataDirectory;

    public JsonFileRepository() {
        this.objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        
        // Set data directory
        this.dataDirectory = "data";
        
        // Ensure data directory exists
        Path dirPath = Paths.get(dataDirectory);
        if (!Files.exists(dirPath)) {
            try {
                Files.createDirectories(dirPath);
            } catch (IOException e) {
                log.error("Failed to create data directory", e);
            }
        }
    }

    public <T> List<T> readAll(String fileName, TypeReference<List<T>> typeReference) {
        try {
            File file = new File(dataDirectory, fileName);
            if (!file.exists()) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(file, typeReference);
        } catch (IOException e) {
            log.error("Error reading from file: {}", fileName, e);
            return new ArrayList<>();
        }
    }

    public <T> void writeAll(String fileName, List<T> data) {
        try {
            File file = new File(dataDirectory, fileName);
            objectMapper.writeValue(file, data);
        } catch (IOException e) {
            log.error("Error writing to file: {}", fileName, e);
        }
    }

    public <T> List<T> findAll(String fileName, TypeReference<List<T>> typeReference) {
        return readAll(fileName, typeReference);
    }

    public <T> T findById(String fileName, TypeReference<List<T>> typeReference, String id, IdExtractor<T> idExtractor) {
        List<T> items = readAll(fileName, typeReference);
        return items.stream()
                .filter(item -> idExtractor.getId(item).equals(id))
                .findFirst()
                .orElse(null);
    }

    public <T> List<T> findByPredicate(String fileName, TypeReference<List<T>> typeReference, Predicate<T> predicate) {
        List<T> items = readAll(fileName, typeReference);
        return items.stream()
                .filter(predicate)
                .toList();
    }

    public <T> T save(String fileName, TypeReference<List<T>> typeReference, T item, IdExtractor<T> idExtractor) {
        List<T> items = readAll(fileName, typeReference);
        String id = idExtractor.getId(item);
        
        // Check if item exists
        int index = -1;
        for (int i = 0; i < items.size(); i++) {
            if (idExtractor.getId(items.get(i)).equals(id)) {
                index = i;
                break;
            }
        }
        
        if (index >= 0) {
            // Update existing item
            items.set(index, item);
        } else {
            // Add new item
            items.add(item);
        }
        
        writeAll(fileName, items);
        return item;
    }

    public <T> boolean deleteById(String fileName, TypeReference<List<T>> typeReference, String id, IdExtractor<T> idExtractor) {
        List<T> items = readAll(fileName, typeReference);
        boolean removed = items.removeIf(item -> idExtractor.getId(item).equals(id));
        if (removed) {
            writeAll(fileName, items);
        }
        return removed;
    }

    public interface IdExtractor<T> {
        String getId(T item);
    }
}

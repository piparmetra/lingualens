package com.example.lingualens;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api")
public class EntryController {

    private final ObjectMapper objectMapper;
    private final Path entriesPath = Paths.get("src", "main", "resources", "static", "entries.json");

    @Autowired
    public EntryController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        try {
            // Create necessary directories and files if they don't exist
            Files.createDirectories(entriesPath.getParent());
            if (!Files.exists(entriesPath)) {
                Files.createFile(entriesPath);
                Files.write(entriesPath, "[]".getBytes());
            }
        } catch (IOException e) {
            // Throw runtime exception if initialization fails
            throw new RuntimeException("Could not initialize storage", e);
        }
    }

    @PostMapping("/submitEntry")
    public ResponseEntity<?> submitEntry(@RequestBody Entry entry) {
        System.out.println("Received entry: " + entry);
        try {
            List<Entry> entries = new ArrayList<>();
            if (Files.exists(entriesPath)) {
                // Read existing entries from the file
                Entry[] existingEntries = objectMapper.readValue(entriesPath.toFile(), Entry[].class);
                Collections.addAll(entries, existingEntries);
                System.out.println("Writing to: " + entriesPath.toAbsolutePath().toString());
            }
            // Add the new entry to the list
            entries.add(entry);
            // Write updated list of entries back to the file
            objectMapper.writeValue(entriesPath.toFile(), entries);
            // Return a JSON response with success message
            String currentContent = new String(Files.readAllBytes(entriesPath));
            System.out.println("Current file content: " + currentContent);
            return ResponseEntity.ok().body(Map.of("message", "Entry saved successfully"));
        } catch (IOException e) {
            e.printStackTrace();
            // Return a JSON response with error message
            return ResponseEntity.badRequest().body("Error saving entry");
        }
    }

    @GetMapping("/entries")
    public ResponseEntity<List<Entry>> getEntries() {
        try {
            // Read entries from the JSON file
            Entry[] existingEntries = objectMapper.readValue(entriesPath.toFile(), Entry[].class);
            List<Entry> entries = new ArrayList<>(Arrays.asList(existingEntries));
            return ResponseEntity.ok().body(entries);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

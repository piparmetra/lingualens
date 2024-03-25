package com.example.lingualens;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api")
public class UserController {

    private final ObjectMapper objectMapper;
    private final Path usersPath = Paths.get("src", "main", "resources", "static", "users.json");

    @Autowired
    public UserController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostMapping("/submitUser")
    public ResponseEntity<String> submitUser(@RequestBody User user) {
        try {
            // Retrieve file path for users JSON data
            File file = usersPath.toFile();
            List<User> users;

            // Check if the file exists and contains data
            if (file.exists() && file.length() > 0) {
                // Read existing users from the file
                User[] existingUsers = objectMapper.readValue(file, User[].class);
                users = new ArrayList<>(Arrays.asList(existingUsers));
            } else {
                users = new ArrayList<>();
            }

            // Add the new user to the list
            users.add(user);

            // Write updated list of users back to the file
            objectMapper.writeValue(file, users);

            // Return a JSON response with success message
            String responseBody = "{\"message\": \"User registered successfully\"}";
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(responseBody);
        } catch (IOException e) {
            e.printStackTrace();
            // Return a JSON response with error message
            String responseBody = "{\"error\": \"Error registering user\"}";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(responseBody);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        try {
            // Read users from the JSON file
            User[] existingUsers = objectMapper.readValue(usersPath.toFile(), User[].class);
            List<User> users = new ArrayList<>(Arrays.asList(existingUsers));
            return ResponseEntity.ok().body(users);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

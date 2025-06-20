package com.company.ems.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.ems.dto.LoginRequest;
import com.company.ems.dto.UserDTO;
import com.company.ems.model.User;
import com.company.ems.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Plaintext password check!
            if (user.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok(Map.of(
                    "username", user.getUsername(),
                    "role", user.getRole().name()
                ));
            }
        }
        // For debug, you can print but it's optional
        System.out.println("USERNAME: " + request.getUsername());
        System.out.println("PASSWORD: " + request.getPassword());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    // Open registration endpoint (for dev/demo)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO dto) {
        if (userRepository.findByUsername(dto.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword()); // <-- Plain text
        user.setFullName(dto.getFullName());
        user.setRole(dto.getRole());
        userRepository.save(user);
        return ResponseEntity.ok("Registered!");
    }
}

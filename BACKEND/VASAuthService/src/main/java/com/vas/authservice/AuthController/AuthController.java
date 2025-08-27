package com.vas.authservice.AuthController;

import com.vas.authservice.Entity.Admin;
import com.vas.authservice.Entity.User;
import com.vas.authservice.AuthService.AuthService;
import com.vas.authservice.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    // User signup
    @PostMapping("/signup/user")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", authService.registerUser(user));
        return ResponseEntity.ok(response);
    }

    // Admin signup
    @PostMapping("/signup/admin")
    public ResponseEntity<Map<String, Object>> registerAdmin(@RequestBody Admin admin) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Admin registered successfully");
        response.put("admin", authService.registerAdmin(admin));
        return ResponseEntity.ok(response);
    }

    // User login with JWT
    @PostMapping("/login/user")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> payload) {
        return authService.loginUser(payload.get("username"), payload.get("password"))
                .map(u -> {
                    String token = jwtUtil.generateToken(u.getUsername(), "USER");
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", u.getUserId());
                    response.put("role", "USER");
                    response.put("token", token);
                    response.put("message", "Login successful");
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("error", "Invalid credentials");
                    return ResponseEntity.status(401).body(errorResponse);
                });
    }

    // Admin login with JWT
    @PostMapping("/login/admin")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Map<String, String> payload) {
        return authService.loginAdmin(payload.get("username"), payload.get("password"))
                .map(a -> {
                    String token = jwtUtil.generateToken(a.getAdminUsername(), "ADMIN");
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", a.getAdminId());
                    response.put("role", "ADMIN");
                    response.put("token", token);
                    response.put("message", "Login successful");
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("error", "Invalid credentials");
                    return ResponseEntity.status(401).body(errorResponse);
                });
    }

    // Get all users (admin only)
    @GetMapping("/users/admin")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    // Get user by ID
    @GetMapping("/user/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable Long id) {
        return authService.getUserById(id)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", user.getUserId());
                    response.put("username", user.getUsername());
                    response.put("email", user.getEmail());
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("error", "No user found");
                    return ResponseEntity.status(404).body(errorResponse);
                });
    }

    // Get admin by ID
    @GetMapping("/admin/{id}")
    public ResponseEntity<Map<String, Object>> getAdminById(@PathVariable Long id) {
        return authService.getAdminById(id)
                .map(admin -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", admin.getAdminId());
                    response.put("username", admin.getAdminUsername());
                    response.put("email", admin.getAdminEmail());
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("error", "Admin not found");
                    return ResponseEntity.status(404).body(errorResponse);
                });
    }

    // Update user info
    @PutMapping("/user/{id}")
    public ResponseEntity<Map<String, Object>> updateUserInfo(@PathVariable Long id, @RequestBody User updatedUser) {
        return authService.updateUserInfo(id, updatedUser)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "User updated successfully");
                    response.put("user", user);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("error", "User not found");
                    return ResponseEntity.status(404).body(errorResponse);
                });
    }
}
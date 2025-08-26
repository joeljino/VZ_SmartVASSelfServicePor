package com.vas.authservice.AuthController;

import com.vas.authservice.Entity.Admin;
import com.vas.authservice.Entity.User;
import com.vas.authservice.AuthService.AuthService;
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

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // User signup
    @PostMapping("/signup/user")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(Map.of(
                "message", "User registered successfully",
                "user", authService.registerUser(user)
        ));
    }

    // Admin signup
    @PostMapping("/signup/admin")
    public ResponseEntity<Map<String, Object>> registerAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(Map.of(
                "message", "Admin registered successfully",
                "admin", authService.registerAdmin(admin)
        ));
    }

    // User login
    @PostMapping("/login/user")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> payload) {
        return authService.loginUser(payload.get("username"), payload.get("password"))
                .map(u -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", u.getUserId());
                    response.put("role", "USER");
                    response.put("message", "Login successful");
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("error", "Invalid credentials");
                    return ResponseEntity.status(401).body(errorResponse);
                });
    }

    // Admin login
    @PostMapping("/login/admin")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Map<String, String> payload) {
        return authService.loginAdmin(payload.get("username"), payload.get("password"))
                .map(a -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", a.getAdminId());
                    response.put("role", "ADMIN");
                    response.put("message", "Login successful");
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("error", "Invalid credentials");
                    return ResponseEntity.status(401).body(errorResponse);
                });
    }

    @GetMapping("users/admin")
    public ResponseEntity<List<User>> getUsers()
    {
        return ResponseEntity.ok(authService.getAllUsers());
    }

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
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("error", "No user found")));
    }

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
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("error", "Admin not found")));
    }


    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUserInfo(@PathVariable Long id, @RequestBody User updatedUser) {
        return authService.updateUserInfo(id, updatedUser)
                .map(user -> ResponseEntity.ok(Map.of(
                        "message", "User updated successfully",
                        "user", user
                )))
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("error", "User not found")));
    }
}
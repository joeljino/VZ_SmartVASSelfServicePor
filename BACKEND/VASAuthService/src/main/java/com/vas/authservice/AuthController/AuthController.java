package com.vas.authservice.AuthController;

import com.vas.authservice.Entity.Admin;
import com.vas.authservice.Entity.User;
import com.vas.authservice.AuthService.AuthService;
import com.vas.authservice.config.JwtUtil;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication Controller", description = "APIs for user and admin authentication and management")
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
    @Operation(summary = "Register a new user", description = "Registers a new user in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Map.class)))
    })
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", authService.registerUser(user));
        return ResponseEntity.ok(response);
    }

    // Admin signup
    @PostMapping("/signup/admin")
    @Operation(summary = "Register a new admin", description = "Registers a new admin in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Admin registered successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Map.class)))
    })
    public ResponseEntity<Map<String, Object>> registerAdmin(@RequestBody Admin admin) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Admin registered successfully");
        response.put("admin", authService.registerAdmin(admin));
        return ResponseEntity.ok(response);
    }

    // User login with JWT
    @PostMapping("/login/user")
    @Operation(summary = "User login", description = "Login for users with username and password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials",
                    content = @Content)
    })
    @CircuitBreaker(name = "authServiceCB", fallbackMethod = "fallbackLoginUser")
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

    public ResponseEntity<Map<String, Object>> fallbackLoginUser(Map<String, String> payload, Throwable t) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "AuthService unavailable. Please try later.");
        response.put("details", t.getMessage());
        return ResponseEntity.status(503).body(response);
    }

    // Admin login with JWT
    @PostMapping("/login/admin")
    @CircuitBreaker(name = "authServiceCB", fallbackMethod = "fallbackLoginAdmin")
    @Operation(summary = "Admin login", description = "Login for admins with username and password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials",
                    content = @Content)
    })
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

    public ResponseEntity<Map<String, Object>> fallbackLoginAdmin(Map<String, String> payload, Throwable t) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "AuthService unavailable. Please try later.");
        response.put("details", t.getMessage());
        return ResponseEntity.status(503).body(response);
    }

    // Get all users (admin only)
    @GetMapping("/users/admin")
    @Operation(summary = "Get all users", description = "Retrieve a list of all registered users (Admin only)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of users retrieved",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class, type = "array")))
    })
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    // Get user by ID
    @GetMapping("/user/{id}")
    @CircuitBreaker(name = "authServiceCB", fallbackMethod = "fallbackGetUserById")
    @Operation(summary = "Get user by ID", description = "Retrieve user details by user ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content)
    })
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
    public ResponseEntity<Map<String, Object>> fallbackGetUserById(Long id, Throwable t) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "AuthService unavailable. Cannot fetch user.");
        response.put("userId", id);
        response.put("details", t.getMessage());
        return ResponseEntity.status(503).body(response);
    }

    // Get admin by ID
    @GetMapping("/admin/{id}")
    @CircuitBreaker(name = "authServiceCB", fallbackMethod = "fallbackGetAdminById")
    @Operation(summary = "Get admin by ID", description = "Retrieve admin details by admin ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Admin found",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "404", description = "Admin not found",
                    content = @Content)
    })
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

    public ResponseEntity<Map<String, Object>> fallbackGetAdminById(Long id, Throwable t) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "AuthService unavailable. Cannot fetch admin.");
        response.put("adminId", id);
        response.put("details", t.getMessage());
        return ResponseEntity.status(503).body(response);
    }

    // Update user info
    @PutMapping("/user/{id}")
    @Operation(summary = "Update user info", description = "Update information for an existing user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content)
    })
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
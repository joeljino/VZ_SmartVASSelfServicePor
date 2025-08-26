package com.vas.authservice.AuthService;

import com.vas.authservice.Entity.Admin;
import com.vas.authservice.Entity.User;
import com.vas.authservice.AuthRepository.AdminRepository;
import com.vas.authservice.AuthRepository.UserRepository;
//import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
//@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final AdminRepository adminRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepo, AdminRepository adminRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.adminRepo = adminRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // Register User
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    // Register Admin
    public Admin registerAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepo.save(admin);
    }

    // User Login
    public Optional<User> loginUser(String username, String password) {
        return userRepo.findByUsername(username)
                .filter(u -> passwordEncoder.matches(password, u.getPassword()));
    }

    // Admin Login
    public Optional<Admin> loginAdmin(String username, String password) {
        return adminRepo.findByAdminUsername(username)
                .filter(admin -> passwordEncoder.matches(password, admin.getPassword()));
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> getUserById(Long userId)
    {
        return userRepo.findById(userId);
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepo.findById(id);
    }

    public Optional<User> updateUserInfo(Long id, User updatedUser) {
        return userRepo.findById(id).map(user -> {
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setPhone(updatedUser.getPhone());
            user.setAddress(updatedUser.getAddress());
            user.setEmail(updatedUser.getEmail());
            return userRepo.save(user);
        });
    }
}

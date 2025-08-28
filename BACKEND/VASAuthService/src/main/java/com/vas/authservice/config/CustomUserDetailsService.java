package com.vas.authservice.config;
import java.util.Optional;
import com.vas.authservice.Entity.User;
import com.vas.authservice.AuthRepository.UserRepository;
import com.vas.authservice.Entity.Admin;
import com.vas.authservice.AuthRepository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository, AdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Try User first
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(user.getPassword())  // hashed
                    .roles("USER")
                    .build();
        }

        // Try Admin next
        Optional<Admin> adminOpt = adminRepository.findByAdminUsername(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            return org.springframework.security.core.userdetails.User
                    .withUsername(admin.getAdminUsername())
                    .password(admin.getPassword())  // hashed
                    .roles("ADMIN")
                    .build();
        }

        // If not found in either table
        throw new UsernameNotFoundException("User '" + username + "' not found");
    }
}


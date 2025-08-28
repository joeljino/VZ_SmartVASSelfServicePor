//package com.vas.authservice.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                // Better: ignore CSRF only for H2 console, not for everything
//                .csrf(csrf -> csrf
//                        .ignoringRequestMatchers("/h2-console/**")
//                )
//
//                // Allow H2 console to be displayed in a frame
//                .headers(headers -> headers.frameOptions().disable())
//                .csrf(csrf -> csrf.disable())  // ✅ modern way
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/h2-console/**").permitAll() // allow H2 console
//                        .requestMatchers("/auth/**").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .formLogin(form -> form.disable())
//                .httpBasic(basic -> basic.disable());
//
//        return http.build();
//    }
//}



package com.vas.authservice.config;

import jakarta.servlet.Filter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,JwtAuthenticationFilter jwtFilter) throws Exception {

        http
                // disable CSRF for all (safe for APIs)
                .csrf(csrf -> csrf.disable())

                //  allow frames (needed for H2 console UI)
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

                // configure endpoint access
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll()
//                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/auth/signup/user").permitAll()
                        .requestMatchers("/auth/login/user").permitAll()
                        .requestMatchers("/auth/signup/admin").permitAll()
                        .requestMatchers("/auth/login/admin").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                // disable default login forms
                .formLogin(form -> form.disable())
//                .httpBasic(basic -> basic.disable());
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}

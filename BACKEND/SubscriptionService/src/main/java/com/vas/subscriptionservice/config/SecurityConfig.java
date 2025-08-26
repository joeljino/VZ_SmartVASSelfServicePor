
package com.vas.subscriptionservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // disable CSRF for all (safe for APIs)
                .csrf(csrf -> csrf.disable())

                //  allow frames (needed for H2 console UI)
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

                // configure endpoint access
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers("/subscriptions", "/subscriptions/**").permitAll()
                        .anyRequest().authenticated()
                )

                // disable default login forms
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}

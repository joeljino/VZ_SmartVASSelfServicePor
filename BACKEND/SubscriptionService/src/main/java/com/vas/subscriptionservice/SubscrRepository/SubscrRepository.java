package com.vas.subscriptionservice.SubscrRepository;

import com.vas.subscriptionservice.Entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscrRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUserId(Long userId);
}

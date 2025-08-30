package com.vas.subscriptionservice.SubscrService;

import com.vas.subscriptionservice.Entity.Subscription;
import com.vas.subscriptionservice.SubscrRepository.SubscrRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SubscrService {

    private final SubscrRepository repo;

    public SubscrService(SubscrRepository repo) {
        this.repo = repo;
    }

    public Subscription createSubscription(Subscription subscription) {
        subscription.setStartDate(LocalDate.now());

        // Set billing cycle
        LocalDate nextBilling = calculateNextBillingDate(LocalDate.now(), subscription.getBillingCycle());
        subscription.setNextBillingDate(nextBilling);

//        subscription.setStatus(Subscription.Status.ACTIVE);
        return repo.save(subscription);
    }

    public List<Subscription> getSubscriptionsByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public Optional<Subscription> getSubscription(Long id) {
        return repo.findById(id);
    }

    public Subscription updateSubscription(Long id, Subscription updated) {
        return repo.findById(id).map(existing -> {
            existing.setStatus(updated.getStatus());
            existing.setAutoRenew(updated.getAutoRenew());
            existing.setStartDate(updated.getStartDate());
            existing.setEndDate(updated.getEndDate());
            existing.setBillingCycle(updated.getBillingCycle());

            return repo.save(existing);
        }).orElseThrow(() -> new RuntimeException("Subscription not found"));
    }
//    public void cancelSubscription(Long id) {
//        repo.findById(id).ifPresent(sub -> {
//            sub.setStatus(Subscription.Status.CANCELLED);
//            repo.save(sub);
//        });
//    }

    private LocalDate calculateNextBillingDate(LocalDate start, Subscription.BillingCycle cycle) {
        return switch (cycle) {
            case MONTHLY -> start.plusMonths(1);
            case QUARTERLY -> start.plusMonths(3);
            case YEARLY -> start.plusYears(1);
        };
    }
}

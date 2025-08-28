package com.vas.subscriptionservice.SubscrController;

import com.vas.subscriptionservice.Entity.Subscription;
import com.vas.subscriptionservice.SubscrService.SubscrService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/subscriptions")
public class SubscrController {

    private final SubscrService service;

    public SubscrController(SubscrService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Subscription sub) {
        Subscription created = service.createSubscription(sub);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Subscription created successfully");
        response.put("data", created);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        return service.getSubscription(id)
                .map(subscription -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("message", "Subscription found");
                    response.put("data", subscription);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Subscription not found");
                    return ResponseEntity.status(404).body(response);
                });
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getByUser(@PathVariable Long userId) {
        List<Subscription> subs = service.getSubscriptionsByUser(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", subs.isEmpty() ? "No subscriptions found" : "Subscriptions retrieved successfully");
        response.put("data", subs);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Subscription sub) {
        Subscription updated = service.updateSubscription(id, sub);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Subscription updated successfully");
        response.put("data", updated);

        return ResponseEntity.ok(response);
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Map<String, Object>> cancel(@PathVariable Long id) {
//        service.cancelSubscription(id);
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("success", true);
//        response.put("message", "Subscription cancelled successfully");
//
//        return ResponseEntity.ok(response);
//    }
}

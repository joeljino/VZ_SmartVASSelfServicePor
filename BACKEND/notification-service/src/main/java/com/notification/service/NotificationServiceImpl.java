package com.notification.service;

import com.notification.entity.Notification;
import com.notification.repository.NotificationRepository;
//import com.notification.util.NotificationSender;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;
//    private final NotificationSender sender;

    public NotificationServiceImpl(NotificationRepository repository) {
        this.repository = repository;
//        this.sender = sender;
    }

    @Override
    public Notification createNotification(Notification notification) {
        Notification saved = repository.save(notification);
//        sender.sendNotification(saved);
        return saved;
    }

    @Override
    public List<Notification> getUserNotifications(Long userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public void markAsRead(Long notificationId) {
        repository.findById(notificationId).ifPresent(n -> {
            n.setRead(true);
            n.setReadAt(LocalDateTime.now());
            repository.save(n);
        });
    }
}

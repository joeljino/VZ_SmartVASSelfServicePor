package com.notification.service;

import com.notification.entity.Notification;
import java.util.List;

public interface NotificationService {
    Notification createNotification(Notification notification);
    List<Notification> getUserNotifications(Long userId);
    void markAsRead(Long notificationId);
}

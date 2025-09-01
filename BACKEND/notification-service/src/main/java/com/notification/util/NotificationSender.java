//package com.notification.util;
//
//import com.notification.entity.Notification;
//import com.notification.entity.NotificationType;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Component;
//
//@Component
//public class NotificationSender {
//
//    private static final Logger logger = LoggerFactory.getLogger(NotificationSender.class);
//
//    public void sendNotification(Notification notification) {
//        NotificationType type = notification.getType();
//        switch (type) {
//            case ORDER, PAYMENT -> sendEmail(notification);
//            case SUBSCRIPTION -> sendSms(notification);
//            case SYSTEM, PROMOTIONAL -> sendInApp(notification);
//        }
//    }
//
//    private void sendEmail(Notification notification) {
//        logger.info("Sending EMAIL to user {} with title '{}'", notification.getUserId(), notification.getTitle());
//        // Integrate JavaMailSender or external email service
//    }
//
//    private void sendSms(Notification notification) {
//        logger.info("Sending SMS to user {} with title '{}'", notification.getUserId(), notification.getTitle());
//        // Integrate SMS gateway such as Twilio
//    }
//
//    private void sendInApp(Notification notification) {
//        logger.info("Creating IN-APP notification for user {}: {}", notification.getUserId(), notification.getMessage());
//        // In-app notifications: save to DB or push via WebSocket
//    }
//}

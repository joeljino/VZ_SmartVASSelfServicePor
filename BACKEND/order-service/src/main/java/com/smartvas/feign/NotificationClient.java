//package com.smartvas.integration;
//
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//
///**
// * Feign client to call Notification microservice.
// */
//@FeignClient(name = "notification-service", url = "http://localhost:8085")
//public interface NotificationClient {
//
//    @PostMapping("/notify")
//    void sendNotification(@RequestBody Object notificationRequest);
//}
//
//

//package com.smartvas.integration;
//
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//
///**
// * Feign client to call User microservice.
// */
//@FeignClient(name = "user-service", url = "http://localhost:8084")
//public interface UserClient {
//
//    @GetMapping("/users/{id}")
//    Object getUserById(@PathVariable Long id);
//}
//

package com.smartvas;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

//@SpringBootApplication → Marks it as Spring Boot app
//@EnableFeignClients → Enables Feign for inter-service calls

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {
 public static void main(String[] args) {
     SpringApplication.run(OrderServiceApplication.class, args);
 }
}
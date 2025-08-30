package com.smartvas.controller;

import com.smartvas.entity.OrderEntity;
import com.smartvas.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    
    //only for adminn
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllOrders() {
        List<OrderEntity> orders = orderService.getAllOrders();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", orders.isEmpty() ? "No orders found" : "Orders retrieved successfully");
        response.put("data", orders);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getOrderById(@PathVariable Integer id) {
        return Optional.ofNullable(orderService.getOrderById(id))
                .map(order -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("message", "Order found");
                    response.put("data", order);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Order not found with id: " + id);
                    return ResponseEntity.status(404).body(response);
                });
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getOrdersByUserId(@PathVariable Integer userId) {
        List<OrderEntity> orders = orderService.getOrdersByUserId(userId);

        Map<String, Object> response = new HashMap<>();
        if (orders.isEmpty()) {
            response.put("success", false);
            response.put("message", "No orders found for user id: " + userId);
            return ResponseEntity.status(404).body(response);
        }

        response.put("success", true);
        response.put("message", "Orders found");
        response.put("data", orders);
        return ResponseEntity.ok(response);
    }


    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody OrderEntity order) {
        OrderEntity createdOrder = orderService.createOrder(order);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Order created successfully");
        response.put("data", createdOrder);
        return ResponseEntity.status(201).body(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateOrder(
            @PathVariable Integer id,
            @RequestBody OrderEntity updatedOrder) {

        OrderEntity updated = orderService.updateOrder(id, updatedOrder);

        if (updated != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Order updated successfully");
            response.put("data", updated);
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Order not found with id: " + id);
            return ResponseEntity.status(404).body(response);
        }
    }

}

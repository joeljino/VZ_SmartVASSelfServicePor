package com.smartvas.service;

import com.smartvas.entity.OrderEntity;
import com.smartvas.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }


    public OrderEntity getOrderById(Integer id) {
        Optional<OrderEntity> order = orderRepository.findById(id);
        return order.orElseThrow(() -> new NotFoundException("Order not found with id: " + id));
    }


    public OrderEntity createOrder(OrderEntity order) {

        if (order.getOrderItems() != null) {
            order.getOrderItems().forEach(item -> item.setOrder(order));
        }

        return orderRepository.save(order);
    }

    public OrderEntity updateOrder(Integer id, OrderEntity updatedOrder) {
        return orderRepository.findById(id).map(existingOrder -> {

            if (updatedOrder.getStatus() != null) {
                existingOrder.setStatus(updatedOrder.getStatus());
            }
            if (updatedOrder.getTotalAmount() != null) {
                existingOrder.setTotalAmount(updatedOrder.getTotalAmount());
            }
            if (updatedOrder.getDiscountAmount() != null) {
                existingOrder.setDiscountAmount(updatedOrder.getDiscountAmount());
            }
            if (updatedOrder.getFinalAmount() != null) {
                existingOrder.setFinalAmount(updatedOrder.getFinalAmount());
            }
            if (updatedOrder.getOrderItems() != null && !updatedOrder.getOrderItems().isEmpty()) {
                existingOrder.setOrderItems(updatedOrder.getOrderItems());
            }
            if (updatedOrder.getOrderTime() != null) {
                existingOrder.setOrderTime(updatedOrder.getOrderTime());
            }

            return orderRepository.save(existingOrder);
        }).orElse(null);
    }


    public List<OrderEntity> getOrdersByUserId(Integer userId) {
        return orderRepository.findByUserId(userId);
    }
}

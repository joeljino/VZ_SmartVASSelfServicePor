package com.smartvas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.sql.Timestamp;

/**
 * OrderEntity represents the main order table.
 */
@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_id")
    private int id;  // Primary key

    @Column(name="user_id", nullable = false)
    private Integer userId;  // User who placed the order

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable = false)
    private OrderStatus status = OrderStatus.PENDING;  // Default status
    
    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;
    
    @Column(name = "discount_amount")
    private Double discountAmount=0.0;
    
    @Column(name = "final_amount", nullable = false)
    private Double finalAmount;
    
    @Column(name = "shipping_address", columnDefinition = "TEXT")
    private Timestamp orderTime;

    /**
     * One-to-many relationship with OrderItemEntity.
     * CascadeType.ALL → saves/deletes child items automatically.
     * FetchType.LAZY → loads items only when needed.
     */
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemEntity> orderItems;
    
    public List<OrderItemEntity> getOrderItems(){
    	return orderItems;
    }
    
    public void setOrderItems(List<OrderItemEntity> orderItems) {
    	this.orderItems=orderItems;
    	if(orderItems !=null) {
    		orderItems.forEach(item-> item.setOrder(this));
    	}
    }
}

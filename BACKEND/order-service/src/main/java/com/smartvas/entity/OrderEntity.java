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
    private Integer id;  // Primary key

    @Column(name="user_id", nullable = false)
    private Integer userId;  // User who placed the order

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable = false)
    private OrderStatus status = OrderStatus.PROCESSING;  // Default status
    
    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;
    
    @Column(name = "discount_amount")
    private Double discountAmount=0.0;
    
    @Column(name = "final_amount", nullable = false)
    private Double finalAmount;

	@Column(name = "shipping_address", columnDefinition = "TEXT")
	private String shippingAddress;

	@Column(name = "order_time", nullable = false)
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Double getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(Double discountAmount) {
		this.discountAmount = discountAmount;
	}

	public Double getFinalAmount() {
		return finalAmount;
	}

	public void setFinalAmount(Double finalAmount) {
		this.finalAmount = finalAmount;
	}

	public Timestamp getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(Timestamp orderTime) {
		this.orderTime = orderTime;
	}
    
}

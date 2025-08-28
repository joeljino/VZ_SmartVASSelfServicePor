package com.smartvas.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;


@Entity
@Table(name = "order_items")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Integer orderItemId;  // Primary key

    @Column(name = "product_id", nullable = false)
    private Integer productId;// Product being ordered
    
    @Column(name = "quantity", nullable = false)
    private Integer quantity=1;  // Quantity ordered
    
    @Column(name = "unit_price", nullable = false)
    private Double unitPrice;  // Price per item
    
    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    /**
     * Many-to-one relationship to parent order.
     * @JoinColumn specifies the foreign key in this table.
     */
   //Many items belong to one order
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private OrderEntity order; //Reference to parent OrderEntity
    
    //Explicit setter for order(so orderservice can call item.setOrder(order))
    public void setOrder(OrderEntity order) {
    	this.order=order;
    }
}



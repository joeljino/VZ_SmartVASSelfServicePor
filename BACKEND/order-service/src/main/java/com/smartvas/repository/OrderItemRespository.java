package com.smartvas.repository;

import com.smartvas.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for OrderItemEntity.
 */
@Repository

public interface OrderItemRespository extends JpaRepository<OrderItemEntity, Integer>  {

}

package com.smartvas.repository;

import com.smartvas.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for OrderEntity.
 * Provides CRUD methods automatically via JpaRepository.
 */

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

}

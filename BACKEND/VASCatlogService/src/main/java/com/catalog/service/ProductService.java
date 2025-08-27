package com.catalog.service;

import com.catalog.entity.Product;
import java.util.List;

public interface ProductService {
    Product create(Product product);
    Product update(Long id, Product product);
    void delete(Long id);
    List<Product> findAll();
    Product findById(Long id);
}

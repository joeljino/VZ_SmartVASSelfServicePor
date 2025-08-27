package com.catalog.service;

import com.catalog.entity.Product;
import com.catalog.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repo;

    public ProductServiceImpl(ProductRepository repo) {
        this.repo = repo;
    }

    @Override
    public Product create(Product product) {
        return repo.save(product);
    }

    @Override
    public Product update(Long id, Product product) {
        Product existing = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        existing.setProductName(product.getProductName());
        existing.setProductDescription(product.getProductDescription());
        existing.setCategory(product.getCategory());
        existing.setBasePrice(product.getBasePrice());
        existing.setIsActive(product.getIsActive());
        existing.setStockQuantity(product.getStockQuantity());
        existing.setSpecifications(product.getSpecifications());
        existing.setImageUrl(product.getImageUrl());
        existing.setUpdatedAt(java.time.LocalDateTime.now());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public List<Product> findAll() {
        return repo.findAll();
    }

    @Override
    public Product findById(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}

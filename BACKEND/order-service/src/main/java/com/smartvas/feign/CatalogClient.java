package com.smartvas.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "catalog-service", url = "http://localhost:8083")
public interface CatalogClient {
    @GetMapping("/products/{id}")
    Object getProductById(@PathVariable Long id);
}


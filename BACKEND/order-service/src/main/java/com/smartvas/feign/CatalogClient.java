//package com.smartvas.feign;
//
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//
//import com.smartvas.dto.ProductDto;
//
//@FeignClient(name = "catalog-service", url = "http://localhost:8083/products")
//public interface CatalogClient {
//    @GetMapping("/{id}")
//    ProductDto getProductById(@PathVariable Long id);
//}
//

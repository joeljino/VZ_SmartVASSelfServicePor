package com.catalog.controller;

import com.catalog.entity.VasCatalog;
import com.catalog.service.VasCatalogService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/vasCat")
public class VasCatalogController {

    private final VasCatalogService service;

    public VasCatalogController(VasCatalogService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public VasCatalog create(@RequestBody VasCatalog vas) {
        return service.create(vas);
    }

    @GetMapping
    public List<VasCatalog> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public VasCatalog findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PatchMapping("/{id}")
    public VasCatalog update(@PathVariable Long id, @RequestBody VasCatalog vas) {
        return service.update(id, vas);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

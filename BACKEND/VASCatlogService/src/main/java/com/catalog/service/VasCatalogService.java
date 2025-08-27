package com.catalog.service;

import com.catalog.entity.VasCatalog;
import java.util.List;

public interface VasCatalogService {
    VasCatalog create(VasCatalog vas);
    VasCatalog update(Long id, VasCatalog vas);
    void delete(Long id);
    List<VasCatalog> findAll();
    VasCatalog findById(Long id);
}

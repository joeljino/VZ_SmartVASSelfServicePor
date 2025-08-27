package com.catalog.service;

import com.catalog.entity.VasCatalog;
import com.catalog.repository.VasCatalogRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VasCatalogServiceImpl implements VasCatalogService {

    private final VasCatalogRepository repo;

    public VasCatalogServiceImpl(VasCatalogRepository repo) {
        this.repo = repo;
    }

    @Override
    public VasCatalog create(VasCatalog vas) {
        return repo.save(vas);
    }

    @Override
    public VasCatalog update(Long id, VasCatalog vas) {
        VasCatalog existing = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("VAS not found"));
        existing.setServiceName(vas.getServiceName());
        existing.setServiceDescription(vas.getServiceDescription());
        existing.setServiceType(vas.getServiceType());
        existing.setPrice(vas.getPrice());
        existing.setBillingCycle(vas.getBillingCycle());
        existing.setIsActive(vas.getIsActive());
        existing.setFeatures(vas.getFeatures());
        existing.setUpdatedAt(java.time.LocalDateTime.now());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public List<VasCatalog> findAll() {
        return repo.findAll();
    }

    @Override
    public VasCatalog findById(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new RuntimeException("VAS not found"));
    }
}

package com.catalog.repository;

import com.catalog.entity.VasCatalog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VasCatalogRepository extends JpaRepository<VasCatalog, Long> {
}

package com.smartvas.service;

/**
 * Custom exception for resources not found (HTTP 404).
 */
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}


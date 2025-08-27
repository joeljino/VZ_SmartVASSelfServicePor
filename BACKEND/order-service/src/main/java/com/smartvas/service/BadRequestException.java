package com.smartvas.service;

/**
 * Custom exception for bad requests (HTTP 400).
 */

public class BadRequestException extends RuntimeException {
	public BadRequestException(String message) {
        super(message);
    }

}

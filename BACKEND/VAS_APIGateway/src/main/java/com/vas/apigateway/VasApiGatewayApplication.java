package com.vas.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class VasApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(VasApiGatewayApplication.class, args);
	}

}

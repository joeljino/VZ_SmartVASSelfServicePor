package com.vas.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryVasServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceRegistryVasServerApplication.class, args);
	}

}

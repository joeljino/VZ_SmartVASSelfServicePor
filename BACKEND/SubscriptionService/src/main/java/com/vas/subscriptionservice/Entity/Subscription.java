package com.vas.subscriptionservice.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "subscriptions")
public class Subscription {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long subscriptionId;

	// The user who paid or initiated the subscription
	private Long userId;   // logical FK to AuthService.users

	// The phone number of the user who receives the subscription
	private String targetPhoneNumber;

	// Reference to the VAS service in CatalogService
	private Long serviceId;

	@Enumerated(EnumType.STRING)
	private Status status = Status.ACTIVE;

	private LocalDate startDate;
	private LocalDate endDate;
	private LocalDate nextBillingDate;

	@Enumerated(EnumType.STRING)
	private BillingCycle billingCycle;

	private Double price;
	private Boolean autoRenew = true;

	private LocalDate createdAt = LocalDate.now();

	public enum Status {
		ACTIVE, INACTIVE
	}

	public enum BillingCycle {
		MONTHLY, QUARTERLY, YEARLY
	}

	// Getters and setters
	public Long getSubscriptionId() { return subscriptionId; }
	public void setSubscriptionId(Long subscriptionId) { this.subscriptionId = subscriptionId; }

	public Long getSubscriberId() { return userId; }
	public void setSubscriberId(Long userId) { this.userId = userId; }

	public String getTargetPhoneNumber() { return targetPhoneNumber; }
	public void setTargetPhoneNumber(String targetPhoneNumber) { this.targetPhoneNumber = targetPhoneNumber; }

	public Long getServiceId() { return serviceId; }
	public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

	public Status getStatus() { return status; }
	public void setStatus(Status status) { this.status = status; }

	public LocalDate getStartDate() { return startDate; }
	public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

	public LocalDate getEndDate() { return endDate; }
	public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

	public LocalDate getNextBillingDate() { return nextBillingDate; }
	public void setNextBillingDate(LocalDate nextBillingDate) { this.nextBillingDate = nextBillingDate; }

	public BillingCycle getBillingCycle() { return billingCycle; }
	public void setBillingCycle(BillingCycle billingCycle) { this.billingCycle = billingCycle; }

	public Double getPrice() { return price; }
	public void setPrice(Double price) { this.price = price; }

	public Boolean getAutoRenew() { return autoRenew; }
	public void setAutoRenew(Boolean autoRenew) { this.autoRenew = autoRenew; }

	public LocalDate getCreatedAt() { return createdAt; }
	public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
}
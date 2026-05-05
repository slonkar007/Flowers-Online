package com.flowersonline.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDto {
    private Long id;
    private String customerEmail;
    private LocalDateTime orderDate;
    private String status;
    private String deliveryAddress;
    private String paymentMethod;
    private BigDecimal totalAmount;
    private List<OrderItemResponseDto> items;
}

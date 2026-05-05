package com.flowersonline.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequestDto {
    private String email; // The user placing the order
    private String deliveryAddress;
    private String paymentMethod; // COD, CREDIT_CARD, DEBIT_CARD
    private List<OrderItemRequestDto> items;
}

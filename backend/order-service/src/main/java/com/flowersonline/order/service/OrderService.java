package com.flowersonline.order.service;

import com.flowersonline.order.dto.OrderRequestDto;
import com.flowersonline.order.dto.OrderResponseDto;

import java.util.List;

public interface OrderService {
    OrderResponseDto placeOrder(OrderRequestDto orderRequestDto);
    List<OrderResponseDto> getCustomerOrders(String email);
    OrderResponseDto getOrderById(Long id);
    List<OrderResponseDto> getAllOrders();
}

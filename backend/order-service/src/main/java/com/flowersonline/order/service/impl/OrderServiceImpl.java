package com.flowersonline.order.service.impl;

import com.flowersonline.model.entity.Customer;
import com.flowersonline.model.entity.Order;
import com.flowersonline.model.entity.OrderItem;
import com.flowersonline.model.entity.ProductSize;
import com.flowersonline.order.dto.*;
import com.flowersonline.order.service.OrderService;
import com.flowersonline.persistence.repository.CustomerRepository;
import com.flowersonline.persistence.repository.OrderRepository;
import com.flowersonline.persistence.repository.ProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Override
    @Transactional
    public OrderResponseDto placeOrder(OrderRequestDto requestDto) {
        // Resolve customer by email
        Customer customer = customerRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Customer not found: " + requestDto.getEmail()));

        Order order = new Order();
        order.setCustomer(customer);
        order.setDeliveryAddress(requestDto.getDeliveryAddress());
        order.setPaymentMethod(requestDto.getPaymentMethod());
        order.setStatus("CONFIRMED");

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequestDto itemDto : requestDto.getItems()) {
            ProductSize productSize = productSizeRepository.findById(itemDto.getProductSizeId())
                    .orElseThrow(() -> new RuntimeException("ProductSize not found: " + itemDto.getProductSizeId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setProductSize(productSize);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setUnitPrice(productSize.getPrice());

            order.addItem(orderItem);
            total = total.add(productSize.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity())));
        }

        order.setTotalAmount(total);
        Order savedOrder = orderRepository.save(order);

        return mapToResponseDto(savedOrder);
    }

    @Override
    public List<OrderResponseDto> getCustomerOrders(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found: " + email));

        return orderRepository.findByCustomerId(customer.getId()).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
        return mapToResponseDto(order);
    }

    @Override
    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    private OrderResponseDto mapToResponseDto(Order order) {
        List<OrderItemResponseDto> itemDtos = order.getItems().stream()
                .map(item -> OrderItemResponseDto.builder()
                        .id(item.getId())
                        .productSizeId(item.getProductSize().getId())
                        .productName(item.getProductSize().getProduct().getName())
                        .size(item.getProductSize().getSize().name())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .build())
                .collect(Collectors.toList());

        return OrderResponseDto.builder()
                .id(order.getId())
                .customerEmail(order.getCustomer().getEmail())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .deliveryAddress(order.getDeliveryAddress())
                .paymentMethod(order.getPaymentMethod())
                .totalAmount(order.getTotalAmount())
                .items(itemDtos)
                .build();
    }
}

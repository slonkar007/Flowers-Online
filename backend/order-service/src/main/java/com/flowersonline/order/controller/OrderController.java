package com.flowersonline.order.controller;

import com.flowersonline.order.dto.OrderRequestDto;
import com.flowersonline.order.dto.OrderResponseDto;
import com.flowersonline.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Customer: Place a new order (Checkout)
    @PostMapping
    public ResponseEntity<OrderResponseDto> placeOrder(@RequestBody OrderRequestDto orderRequestDto) {
        try {
            OrderResponseDto response = orderService.placeOrder(orderRequestDto);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Customer: Get own order history by email
    @GetMapping("/my/{email}")
    public ResponseEntity<List<OrderResponseDto>> getCustomerOrders(@PathVariable String email) {
        return ResponseEntity.ok(orderService.getCustomerOrders(email));
    }

    // Customer / Admin: Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    // Admin: Get all orders
    @GetMapping("/admin/all")
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}

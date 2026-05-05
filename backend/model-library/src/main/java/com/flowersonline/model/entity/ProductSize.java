package com.flowersonline.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "product_sizes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSize {

    public enum Size {
        SMALL, MEDIUM, LARGE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "stock_qty", nullable = false)
    private Integer stockQty;
}

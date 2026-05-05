package com.flowersonline.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSizeDto {
    private Long id;
    private String size; // SMALL, MEDIUM, LARGE
    private BigDecimal price;
    private Integer stockQty;
}

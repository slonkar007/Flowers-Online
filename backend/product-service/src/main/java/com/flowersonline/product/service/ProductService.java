package com.flowersonline.product.service;

import com.flowersonline.product.dto.ProductDto;

import java.util.List;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);
    List<ProductDto> getAllProducts();
    List<ProductDto> getProductsByCategory(Long categoryId);
    ProductDto getProductById(Long id);
    ProductDto updateProduct(Long id, ProductDto productDto);
    void deleteProduct(Long id);
}

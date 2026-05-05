package com.flowersonline.product.service;

import com.flowersonline.model.entity.Category;
import com.flowersonline.model.entity.Product;
import com.flowersonline.model.entity.ProductSize;
import com.flowersonline.persistence.repository.CategoryRepository;
import com.flowersonline.persistence.repository.ProductRepository;
import com.flowersonline.product.dto.ProductDto;
import com.flowersonline.product.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class ProductServiceIntegrationTest {

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private Long savedProductId;
    private String categoryName = "Roses";

    @BeforeEach
    void setUp() {
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        Category category = Category.builder()
                .name(categoryName)
                .description("All types of roses")
                .build();
        category = categoryRepository.save(category);

        Set<Category> categories = new HashSet<>();
        categories.add(category);

        Product product = Product.builder()
                .name("Red Rose")
                .description("Beautiful red rose")
                .imageUrl("rose.jpg")
                .categories(categories)
                .build();

        ProductSize size = ProductSize.builder()
                .size(ProductSize.Size.SMALL)
                .price(new BigDecimal("299.00"))
                .stockQty(100)
                .product(product)
                .build();
        
        product.setSizes(List.of(size));
        product = productRepository.save(product);
        savedProductId = product.getId();
    }

    @Test
    void testGetAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        assertFalse(products.isEmpty());
        assertEquals("Red Rose", products.get(0).getName());
    }

    @Test
    void testGetProductsByCategory() {
        Category category = categoryRepository.findAll().get(0);
        List<ProductDto> products = productService.getProductsByCategory(category.getId());
        assertFalse(products.isEmpty());
        assertEquals("Red Rose", products.get(0).getName());
    }

    @Test
    void testGetProductById() {
        ProductDto product = productService.getProductById(savedProductId);
        assertNotNull(product);
        assertEquals("Red Rose", product.getName());
        assertEquals(1, product.getSizes().size());
    }

    @Test
    void testGetProductById_NotFound() {
        assertThrows(RuntimeException.class, () -> {
            productService.getProductById(999L);
        });
    }
}

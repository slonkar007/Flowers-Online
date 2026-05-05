package com.flowersonline.product.service.impl;

import com.flowersonline.model.entity.Category;
import com.flowersonline.model.entity.Product;
import com.flowersonline.model.entity.ProductSize;
import com.flowersonline.persistence.repository.CategoryRepository;
import com.flowersonline.persistence.repository.ProductRepository;
import com.flowersonline.persistence.repository.ProductSizeRepository;
import com.flowersonline.product.dto.CategoryDto;
import com.flowersonline.product.dto.ProductDto;
import com.flowersonline.product.dto.ProductSizeDto;
import com.flowersonline.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public ProductDto createProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setImageUrl(productDto.getImageUrl());

        // Set Categories
        Set<Category> categories = new HashSet<>();
        if (productDto.getCategories() != null) {
            for (CategoryDto catDto : productDto.getCategories()) {
                Category category = categoryRepository.findById(catDto.getId())
                        .orElseThrow(() -> new RuntimeException("Category not found with ID: " + catDto.getId()));
                categories.add(category);
            }
        }
        product.setCategories(categories);

        // Save product first
        Product savedProduct = productRepository.save(product);

        // Save Sizes
        if (productDto.getSizes() != null && !productDto.getSizes().isEmpty()) {
            for (ProductSizeDto sizeDto : productDto.getSizes()) {
                ProductSize productSize = new ProductSize();
                productSize.setProduct(savedProduct);
                productSize.setSize(ProductSize.Size.valueOf(sizeDto.getSize()));
                productSize.setPrice(sizeDto.getPrice());
                productSize.setStockQty(sizeDto.getStockQty());
                productSizeRepository.save(productSize);
            }
        }

        return getProductById(savedProduct.getId());
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoriesId(categoryId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        return mapToDto(product);
    }

    @Override
    @Transactional
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setImageUrl(productDto.getImageUrl());

        Set<Category> categories = new HashSet<>();
        if (productDto.getCategories() != null) {
            for (CategoryDto catDto : productDto.getCategories()) {
                Category category = categoryRepository.findById(catDto.getId())
                        .orElseThrow(() -> new RuntimeException("Category not found with ID: " + catDto.getId()));
                categories.add(category);
            }
        }
        product.setCategories(categories);
        productRepository.save(product);

        // Update sizes (simplest approach: delete all and re-insert)
        productSizeRepository.deleteByProductId(id);
        
        if (productDto.getSizes() != null) {
            for (ProductSizeDto sizeDto : productDto.getSizes()) {
                ProductSize productSize = new ProductSize();
                productSize.setProduct(product);
                productSize.setSize(ProductSize.Size.valueOf(sizeDto.getSize()));
                productSize.setPrice(sizeDto.getPrice());
                productSize.setStockQty(sizeDto.getStockQty());
                productSizeRepository.save(productSize);
            }
        }

        return getProductById(id);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with ID: " + id);
        }
        productSizeRepository.deleteByProductId(id);
        productRepository.deleteById(id);
    }

    private ProductDto mapToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setImageUrl(product.getImageUrl());
        dto.setCreatedAt(product.getCreatedAt());

        if (product.getCategories() != null) {
            Set<CategoryDto> categoryDtos = product.getCategories().stream()
                    .map(cat -> new CategoryDto(cat.getId(), cat.getName()))
                    .collect(Collectors.toSet());
            dto.setCategories(categoryDtos);
        }

        List<ProductSize> sizes = productSizeRepository.findByProductId(product.getId());
        if (sizes != null) {
            List<ProductSizeDto> sizeDtos = sizes.stream()
                    .map(s -> new ProductSizeDto(s.getId(), s.getSize().name(), s.getPrice(), s.getStockQty()))
                    .collect(Collectors.toList());
            dto.setSizes(sizeDtos);
        }

        return dto;
    }
}

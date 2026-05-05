package com.flowersonline.product.config;

import com.flowersonline.model.entity.Category;
import com.flowersonline.model.entity.Product;
import com.flowersonline.model.entity.ProductSize;
import com.flowersonline.persistence.repository.CategoryRepository;
import com.flowersonline.persistence.repository.ProductRepository;
import com.flowersonline.persistence.repository.ProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Override
    public void run(String... args) {
        // Seed Categories
        List<String> categoryNames = Arrays.asList(
                "Birthday", "Love", "Marriage", "Grand-Opening", "Sympathy", "Get-well-soon"
        );

        for (String name : categoryNames) {
            if (!categoryRepository.existsByName(name)) {
                categoryRepository.save(Category.builder().name(name).build());
            }
        }

        System.out.println("✅ Categories seeded: " + categoryRepository.count());

        // Seed Sample Products
        if (productRepository.count() == 0) {
            Category birthday = categoryRepository.findByName("Birthday").orElse(null);
            Category love = categoryRepository.findByName("Love").orElse(null);
            Category sympathy = categoryRepository.findByName("Sympathy").orElse(null);

            seedProduct("Sunshine Bouquet",
                    "A bright and cheerful arrangement of sunflowers to brighten anyone's day.",
                    "https://images.unsplash.com/photo-1490750967868-88df5691cc5b?w=400",
                    Set.of(birthday));

            seedProduct("Red Rose Collection",
                    "Classic red roses symbolizing deep love and passion. Perfect for Valentine's Day.",
                    "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=400",
                    Set.of(love));

            seedProduct("White Lily Farewell",
                    "An elegant arrangement of white lilies representing peace and remembrance.",
                    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
                    sympathy != null ? Set.of(sympathy) : new HashSet<>());

            seedProduct("Celebration Mix",
                    "A vibrant mix of seasonal flowers to celebrate any joyful occasion.",
                    "https://images.unsplash.com/photo-1487530811015-780df50ee7f5?w=400",
                    Set.of(birthday, love));

            System.out.println("✅ Sample products seeded: " + productRepository.count());
        }
    }

    private void seedProduct(String name, String description, String imageUrl, Set<Category> categories) {
        Product product = Product.builder()
                .name(name)
                .description(description)
                .imageUrl(imageUrl)
                .categories(categories)
                .build();

        Product savedProduct = productRepository.save(product);

        productSizeRepository.save(ProductSize.builder()
                .product(savedProduct).size(ProductSize.Size.SMALL)
                .price(new BigDecimal("300.00")).stockQty(50).build());

        productSizeRepository.save(ProductSize.builder()
                .product(savedProduct).size(ProductSize.Size.MEDIUM)
                .price(new BigDecimal("500.00")).stockQty(30).build());

        productSizeRepository.save(ProductSize.builder()
                .product(savedProduct).size(ProductSize.Size.LARGE)
                .price(new BigDecimal("800.00")).stockQty(20).build());
    }
}

package com.flowersonline.admin.config;

import com.flowersonline.model.entity.ShopLocation;
import com.flowersonline.persistence.repository.ShopLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminDataInitializer implements CommandLineRunner {

    @Autowired
    private ShopLocationRepository shopLocationRepository;

    @Override
    public void run(String... args) {
        if (shopLocationRepository.count() == 0) {
            shopLocationRepository.save(ShopLocation.builder()
                    .shopName("Flowers-Online - MG Road")
                    .address("12, MG Road, Bengaluru, Karnataka - 560001")
                    .phoneNumber("+91-80-12345678")
                    .build());

            shopLocationRepository.save(ShopLocation.builder()
                    .shopName("Flowers-Online - Bandra")
                    .address("34, Linking Road, Bandra West, Mumbai, Maharashtra - 400050")
                    .phoneNumber("+91-22-87654321")
                    .build());

            shopLocationRepository.save(ShopLocation.builder()
                    .shopName("Flowers-Online - Connaught Place")
                    .address("56, Block A, Connaught Place, New Delhi - 110001")
                    .phoneNumber("+91-11-99887766")
                    .build());

            shopLocationRepository.save(ShopLocation.builder()
                    .shopName("Flowers-Online - Anna Nagar")
                    .address("78, 2nd Avenue, Anna Nagar, Chennai, Tamil Nadu - 600040")
                    .phoneNumber("+91-44-11223344")
                    .build());

            shopLocationRepository.save(ShopLocation.builder()
                    .shopName("Flowers-Online - Banjara Hills")
                    .address("90, Road No. 12, Banjara Hills, Hyderabad, Telangana - 500034")
                    .phoneNumber("+91-40-55667788")
                    .build());

            System.out.println("✅ Shop locations seeded: " + shopLocationRepository.count());
        }
    }
}

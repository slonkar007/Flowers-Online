package com.flowersonline.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "shop_locations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shop_name", nullable = false)
    private String shopName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
}

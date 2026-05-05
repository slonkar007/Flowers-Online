package com.flowersonline.persistence.repository;

import com.flowersonline.model.entity.ShopLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopLocationRepository extends JpaRepository<ShopLocation, Long> {
}

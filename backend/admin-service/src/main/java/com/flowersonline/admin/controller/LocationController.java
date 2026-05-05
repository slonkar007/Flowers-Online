package com.flowersonline.admin.controller;

import com.flowersonline.model.entity.ShopLocation;
import com.flowersonline.persistence.repository.ShopLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin("*")
public class LocationController {

    @Autowired
    private ShopLocationRepository shopLocationRepository;

    // Public: Get all shop locations
    @GetMapping
    public ResponseEntity<List<ShopLocation>> getAllLocations() {
        return ResponseEntity.ok(shopLocationRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShopLocation> getLocationById(@PathVariable Long id) {
        ShopLocation location = shopLocationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop location not found with ID: " + id));
        return ResponseEntity.ok(location);
    }

    // Admin: Add a new shop location
    @PostMapping("/admin")
    public ResponseEntity<ShopLocation> addLocation(@RequestBody ShopLocation shopLocation) {
        return new ResponseEntity<>(shopLocationRepository.save(shopLocation), HttpStatus.CREATED);
    }

    // Admin: Update a shop location
    @PutMapping("/admin/{id}")
    public ResponseEntity<ShopLocation> updateLocation(@PathVariable Long id, @RequestBody ShopLocation updated) {
        ShopLocation existing = shopLocationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop location not found with ID: " + id));
        existing.setShopName(updated.getShopName());
        existing.setAddress(updated.getAddress());
        existing.setPhoneNumber(updated.getPhoneNumber());
        return ResponseEntity.ok(shopLocationRepository.save(existing));
    }

    // Admin: Delete a shop location
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteLocation(@PathVariable Long id) {
        shopLocationRepository.deleteById(id);
        return ResponseEntity.ok("Location deleted successfully.");
    }
}

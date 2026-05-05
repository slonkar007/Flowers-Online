package com.flowersonline.admin.controller;

import com.flowersonline.model.entity.Review;
import com.flowersonline.persistence.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // Customer: Submit a review
    @PostMapping
    public ResponseEntity<String> submitReview(@RequestBody Review review) {
        if (review.getRating() < 1 || review.getRating() > 5) {
            return new ResponseEntity<>("Rating must be between 1 and 5.", HttpStatus.BAD_REQUEST);
        }
        reviewRepository.save(review);
        return new ResponseEntity<>("Thank you for your feedback!", HttpStatus.CREATED);
    }

    // Admin: View all reviews
    @GetMapping("/admin/all")
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewRepository.findAll());
    }
}

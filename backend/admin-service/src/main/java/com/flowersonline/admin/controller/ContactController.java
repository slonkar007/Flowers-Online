package com.flowersonline.admin.controller;

import com.flowersonline.model.entity.ContactMessage;
import com.flowersonline.persistence.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin("*")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    // Customer: Submit a contact message
    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody ContactMessage contactMessage) {
        contactMessageRepository.save(contactMessage);
        return new ResponseEntity<>("Message sent successfully!", HttpStatus.CREATED);
    }

    // Admin: View all contact messages
    @GetMapping("/admin/all")
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactMessageRepository.findAll());
    }
}

package com.honeywell.inventory_dashboard.controller;


import com.honeywell.inventory_dashboard.model.Movement;
import com.honeywell.inventory_dashboard.service.MovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
        import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MovementController {

    private final MovementService service;

    @GetMapping("/movements")
    public ResponseEntity<List<Movement>> getMovements(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam(required = false) String type
    ) throws Exception {

        return ResponseEntity.ok(
                service.getMovements(from, to, type)
        );
    }

    @PostMapping("/verify-file")
    public ResponseEntity<?> verifyFile(
            @RequestParam MultipartFile file,
            @RequestParam String sha
    ) throws Exception {

        return ResponseEntity.ok(
                service.verifyAndSave(file, sha)
        );
    }
}
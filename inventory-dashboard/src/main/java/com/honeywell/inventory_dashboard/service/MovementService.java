package com.honeywell.inventory_dashboard.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.honeywell.inventory_dashboard.model.Movement;
import com.honeywell.inventory_dashboard.utils.ShaUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovementService {

    private static final String FILE_PATH = "data/movements.json";

    private final ObjectMapper mapper = new ObjectMapper();

    public List<Movement> getMovements(
            String from,
            String to,
            String type
    ) throws Exception {

        List<Movement> movements = readAll();

        return movements.stream()
                .filter(m -> {
                    String date = m.getTimestamp().substring(0, 10);

                    boolean matchesDate =
                            date.compareTo(from) >= 0 &&
                                    date.compareTo(to) <= 0;

                    boolean matchesType =
                            type == null ||
                                    type.isEmpty() ||
                                    m.getMovementType().equalsIgnoreCase(type);

                    return matchesDate && matchesType;
                })
                .collect(Collectors.toList());
    }

    public List<Movement> verifyAndSave(
            MultipartFile file,
            String sha
    ) throws Exception {

        byte[] bytes = file.getBytes();

        String calculatedSha = ShaUtil.generateSHA256(bytes);

        if (!calculatedSha.equalsIgnoreCase(sha)) {
            throw new RuntimeException("SHA validation failed");
        }

        List<Movement> movements =
                mapper.readValue(bytes,
                        new TypeReference<List<Movement>>() {});

        File target = new File(FILE_PATH);

        mapper.writerWithDefaultPrettyPrinter()
                .writeValue(target, movements);

        return movements;
    }

    private List<Movement> readAll() throws Exception {

        File file = new File(FILE_PATH);

        return mapper.readValue(
                file,
                new TypeReference<List<Movement>>() {}
        );
    }
}
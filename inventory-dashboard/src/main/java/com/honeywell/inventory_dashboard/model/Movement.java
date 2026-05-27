package com.honeywell.inventory_dashboard.model;

import lombok.Data;

@Data
public class Movement {

    private String id;
    private String timestamp;
    private String sku;
    private String movementType;
    private Integer quantity;
    private String warehouse;
}

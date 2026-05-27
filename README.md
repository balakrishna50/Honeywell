# Honeywell
Java with React Full Stack Assessment
# Inventory Movement Dashboard

A full-stack web application built using React and Spring Boot to validate uploaded stock movement JSON files using SHA-256 verification and visualize inventory movement data.

---

# Tech Stack

## Frontend
- React (Vite)
- Axios
- Recharts

## Backend
- Java 21
- Spring Boot 3
- Maven

---

# Features

## SHA-256 File Validation
- Upload JSON stock movement file
- SHA-256 hash generated in frontend
- Backend recomputes SHA-256 hash
- File accepted only if hashes match

## Inventory Dashboard
- Date range filter
- Movement type filter (IN / OUT)
- Warehouse filter
- Paginated table (10 rows per page)
- Pie chart for IN vs OUT quantities
- Time-series chart for daily movement quantities

## Backend Persistence
- Uploaded JSON replaces backend dataset after successful SHA validation
- All future API requests use the updated backend file

---

# Project Structure

```text
Honeywell/

├── inventory-dashboard/
│   ├── data/
│   │   └── movements.json
│   ├── src/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

# Backend Setup

## Prerequisites
- Java 21
- Maven

## Steps

Navigate to backend folder:

```bash
cd inventory-dashboard
```

Run the application:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8081
```

---

# Frontend Setup

## Prerequisites
- Node.js
- npm

## Steps

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Endpoints

## GET /api/movements

Fetch filtered stock movement records.

### Query Parameters

| Parameter | Description |
|---|---|
| from | Start date (YYYY-MM-DD) |
| to | End date (YYYY-MM-DD) |
| type | IN / OUT (optional) |
| warehouse | Warehouse filter (optional) |

### Example

```http
GET /api/movements?from=2026-01-01&to=2026-12-31&type=IN
```

---

## POST /api/verify-file

Upload and validate JSON file using SHA-256.

### Form Data

| Field | Description |
|---|---|
| file | JSON file |
| sha | SHA-256 digest |

### Behavior
- Backend recomputes SHA-256 hash
- Compares uploaded SHA with generated SHA
- If valid:
    - Parses JSON
    - Updates backend data file
    - Returns parsed JSON response

---

# Data File Location

Initial dataset should be placed here:

```text
backend/data/movements.json
```

This file gets replaced after successful uploads.

---

# Assumptions / Trade-offs

- Data is persisted in JSON file storage instead of database
- Pagination implemented on frontend
- Charts are rendered from filtered dataset returned by backend
- No authentication added since not required in assessment

---

# Future Improvements

- Add unit tests
- Add Docker support
- Add database persistence
- Add authentication
- Add advanced filtering and sorting

---

# Author

Balakrishna Malla

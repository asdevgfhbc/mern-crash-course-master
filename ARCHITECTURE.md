# API Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Postman / Frontend)              │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP Requests
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    EXPRESS SERVER (server.js)               │
│                         Port: 5000                          │
├─────────────────────────────────────────────────────────────┤
│  Middleware:                                                │
│  - CORS                                                     │
│  - express.json()                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
┌───────▼──────────┐            ┌────────▼─────────┐
│  Boat Routes     │            │ Reservation      │
│  /api/boats      │            │ Routes           │
│                  │            │ /api/reservations│
└───────┬──────────┘            └────────┬─────────┘
        │                                │
┌───────▼──────────┐            ┌────────▼─────────┐
│  Boat Controller │            │ Reservation      │
│  - getBoats()    │            │ Controller       │
│  - getBoat()     │            │ - getReservations│
│  - createBoat()  │            │ - getReservation │
│  - updateBoat()  │            │ - createRes...   │
│  - deleteBoat()  │            │ - updateRes...   │
└───────┬──────────┘            │ - deleteRes...   │
        │                       └────────┬─────────┘
        │                                │
┌───────▼──────────┐            ┌────────▼─────────┐
│  Boat Model      │            │ Reservation      │
│  - name          │◄───────────┤ Model            │
│  - type          │  Reference │ - customerName   │
│  - capacity      │            │ - customerEmail  │
│  - price         │            │ - customerPhone  │
│  - description   │            │ - boat (ref)     │
│  - image         │            │ - reservationDate│
│  - available     │            │ - reservationTime│
└───────┬──────────┘            │ - numberOfPeople │
        │                       │ - status         │
        │                       │ - notes          │
        │                       └────────┬─────────┘
        │                                │
        └────────────────┬───────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    MongoDB Database                         │
│                  boat-reservation                           │
│                                                             │
│  Collections:                                               │
│  - boats                                                    │
│  - reservations                                             │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow Example

### Creating a Reservation

```
1. Client Request:
   POST /api/reservations
   {
     "customerName": "John Doe",
     "customerEmail": "john@example.com",
     "boat": "boat_id",
     ...
   }
   
2. Express Server:
   - Receives request
   - Parses JSON body
   - Routes to reservation.routes.js
   
3. Route Handler:
   - Matches POST /api/reservations
   - Calls createReservation() controller
   
4. Controller Logic:
   - Validates required fields
   - Checks if boat exists
   - Validates boat availability
   - Checks capacity constraints
   - Creates new Reservation instance
   - Saves to MongoDB
   
5. Database:
   - Stores reservation document
   - Returns saved document with _id
   
6. Response:
   {
     "success": true,
     "data": {
       "_id": "reservation_id",
       "customerName": "John Doe",
       "boat": { boat details... },
       "status": "Pending",
       ...
     }
   }
```

## Data Flow Diagram

```
┌──────────┐
│  Client  │
└────┬─────┘
     │ 1. HTTP Request
     ▼
┌────────────────┐
│  Routes Layer  │
│  (URL Mapping) │
└────┬───────────┘
     │ 2. Route to Controller
     ▼
┌───────────────────┐
│ Controllers Layer │
│ (Business Logic)  │
└────┬──────────────┘
     │ 3. Data Operations
     ▼
┌──────────────┐
│ Models Layer │
│  (Schemas)   │
└────┬─────────┘
     │ 4. Database Query
     ▼
┌──────────┐
│ MongoDB  │
└────┬─────┘
     │ 5. Return Data
     ▼
┌──────────┐
│  Client  │
└──────────┘
```

## MVC Pattern Implementation

```
┌─────────────────────────────────────────────────────────┐
│                        VIEW                             │
│              (Frontend - Not Implemented)               │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ API Calls
                         │
┌────────────────────────▼────────────────────────────────┐
│                     CONTROLLER                          │
│  ┌──────────────────┐    ┌─────────────────────┐       │
│  │ boat.controller  │    │ reservation         │       │
│  │                  │    │ .controller         │       │
│  │ - Business Logic │    │ - Business Logic    │       │
│  │ - Validation     │    │ - Validation        │       │
│  │ - Error Handling │    │ - Error Handling    │       │
│  └────────┬─────────┘    └──────────┬──────────┘       │
└───────────┼──────────────────────────┼──────────────────┘
            │                          │
            │ Uses Models              │
            │                          │
┌───────────▼──────────────────────────▼──────────────────┐
│                       MODEL                             │
│  ┌──────────────┐         ┌──────────────────┐         │
│  │ Boat Model   │         │ Reservation Model │         │
│  │              │         │                   │         │
│  │ - Schema     │         │ - Schema          │         │
│  │ - Validation │         │ - Validation      │         │
│  │ - Methods    │◄────────┤ - Methods         │         │
│  └──────┬───────┘         └────────┬──────────┘         │
└─────────┼──────────────────────────┼────────────────────┘
          │                          │
          │ Database Operations      │
          │                          │
┌─────────▼──────────────────────────▼──────────────────┐
│                  MongoDB Database                     │
└───────────────────────────────────────────────────────┘
```

## Error Handling Flow

```
Client Request
     │
     ▼
┌─────────────────┐
│ Validate Input  │
└────┬────────────┘
     │
     ├─► Invalid? ──► 400 Bad Request
     │
     ▼
┌─────────────────┐
│ Check Resources │
└────┬────────────┘
     │
     ├─► Not Found? ──► 404 Not Found
     │
     ▼
┌─────────────────┐
│ Process Request │
└────┬────────────┘
     │
     ├─► Error? ──► 500 Server Error
     │
     ▼
┌─────────────────┐
│ Success Response│ ──► 200 OK / 201 Created
└─────────────────┘
```

## Key Features

### 1. Separation of Concerns
- **Routes**: Handle HTTP endpoints
- **Controllers**: Implement business logic
- **Models**: Define data structure and validation

### 2. RESTful Design
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Resource-based URLs
- Consistent response format

### 3. Data Validation
- Schema-level validation with Mongoose
- Controller-level business rule validation
- Email format validation
- Capacity constraints

### 4. Error Handling
- Consistent error response format
- Appropriate HTTP status codes
- Detailed error messages
- Server error logging

### 5. Database Relationships
- Reservation references Boat (ObjectId)
- Population on retrieval for complete data
- Referential integrity checks

## Scalability Considerations

The architecture supports:
- Adding new resources (e.g., Users, Payments)
- Extending existing models
- Adding middleware (authentication, logging)
- Implementing caching
- Horizontal scaling
- API versioning

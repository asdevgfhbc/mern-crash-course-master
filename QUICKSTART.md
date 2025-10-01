# Quick Start Guide - Boat Reservation API

## Prerequisites
- Node.js v14+
- MongoDB v4.4+
- Postman (for API testing)

## Installation Steps

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd mern-crash-course-master
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB connection string:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/boat-reservation
   ```

3. **Start MongoDB**
   - Windows: `net start MongoDB`
   - Linux/Mac: `sudo systemctl start mongod`

4. **Run the Server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## Testing with Postman

### Import Collection
1. Open Postman
2. Click "Import" 
3. Select `Boat-Reservation-API.postman_collection.json`

### Test Flow

#### 1. Create a Boat
**POST** `http://localhost:5000/api/boats`

Body (JSON):
```json
{
  "name": "Ocean Breeze",
  "type": "Yacht",
  "capacity": 10,
  "price": 500,
  "description": "Luxury yacht for ocean trips",
  "available": true
}
```

Save the returned `_id` for next steps.

#### 2. Get All Boats
**GET** `http://localhost:5000/api/boats`

Verify your boat appears in the list.

#### 3. Create a Reservation
**POST** `http://localhost:5000/api/reservations`

Body (JSON):
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "boat": "<BOAT_ID_FROM_STEP_1>",
  "reservationDate": "2024-12-25",
  "reservationTime": "10:00 AM",
  "numberOfPeople": 5,
  "notes": "Birthday celebration"
}
```

#### 4. Get All Reservations
**GET** `http://localhost:5000/api/reservations`

View all reservations with populated boat details.

#### 5. Update Reservation Status
**PUT** `http://localhost:5000/api/reservations/<RESERVATION_ID>`

Body (JSON):
```json
{
  "status": "Confirmed"
}
```

## API Endpoints Summary

### Boats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/boats | Get all boats |
| GET | /api/boats/:id | Get single boat |
| POST | /api/boats | Create new boat |
| PUT | /api/boats/:id | Update boat |
| DELETE | /api/boats/:id | Delete boat |

### Reservations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/reservations | Get all reservations |
| GET | /api/reservations/:id | Get single reservation |
| POST | /api/reservations | Create new reservation |
| PUT | /api/reservations/:id | Update reservation |
| DELETE | /api/reservations/:id | Delete reservation |

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Change PORT in `.env`
- Or kill the process using port 5000

### Module Not Found
- Run `npm install` to install dependencies
- Ensure `"type": "module"` is in package.json

## Validation Features

### Boat Validation
- Name, type, capacity, and price are required
- Capacity must be at least 1
- Price cannot be negative
- Type must be one of: Speedboat, Yacht, Sailboat, Catamaran, Fishing Boat, Other

### Reservation Validation
- All customer details are required
- Email format validation
- Number of people must not exceed boat capacity
- Boat must exist and be available
- Status: Pending, Confirmed, Cancelled, or Completed

## Development Tips

1. **Use nodemon for development**
   ```bash
   npm run dev
   ```
   Changes will auto-reload the server.

2. **Check server logs**
   All errors and info are logged to console.

3. **Test data validation**
   Try creating boats/reservations with missing or invalid data to see validation in action.

4. **MongoDB Compass**
   Use MongoDB Compass to visually inspect your database: `mongodb://localhost:27017`

## Next Steps

- Add user authentication
- Implement payment gateway
- Add email notifications
- Create frontend with React
- Add image upload for boats
- Implement search and filtering

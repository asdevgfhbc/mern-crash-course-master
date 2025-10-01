# Boat Reservation & Management Backend System

A Node.js and Express backend connected to MongoDB for managing boat trip reservations. It allows users to view available boats and submit booking requests with customer details, selected boat, date, and time. Built with an MVC structure using models, controllers, and routes, the API is fully testable via Postman.

## Features

- **Boat Management**: CRUD operations for managing boats (view, create, update, delete)
- **Reservation System**: Complete booking management with customer details validation
- **RESTful API**: Clean and consistent API endpoints
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Input Validation**: Server-side validation for all inputs
- **MVC Architecture**: Well-organized code structure with Models, Controllers, and Routes

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mern-crash-course-master
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/boat-reservation
```

4. Start MongoDB service (if running locally):
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

5. Run the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Boats

#### Get All Boats
```
GET /api/boats
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "boat_id",
      "name": "Ocean Breeze",
      "type": "Yacht",
      "capacity": 10,
      "price": 500,
      "description": "Luxury yacht for ocean trips",
      "image": "default-boat.jpg",
      "available": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Boat
```
GET /api/boats/:id
```
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "boat_id",
    "name": "Ocean Breeze",
    "type": "Yacht",
    "capacity": 10,
    "price": 500,
    "description": "Luxury yacht for ocean trips",
    "image": "default-boat.jpg",
    "available": true
  }
}
```

#### Create Boat
```
POST /api/boats
```
**Request Body:**
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
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "boat_id",
    "name": "Ocean Breeze",
    "type": "Yacht",
    "capacity": 10,
    "price": 500,
    "description": "Luxury yacht for ocean trips",
    "image": "default-boat.jpg",
    "available": true
  }
}
```

#### Update Boat
```
PUT /api/boats/:id
```
**Request Body:**
```json
{
  "name": "Updated Ocean Breeze",
  "price": 550,
  "available": false
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "boat_id",
    "name": "Updated Ocean Breeze",
    "type": "Yacht",
    "capacity": 10,
    "price": 550,
    "available": false
  }
}
```

#### Delete Boat
```
DELETE /api/boats/:id
```
**Response:**
```json
{
  "success": true,
  "message": "Boat deleted successfully"
}
```

### Reservations

#### Get All Reservations
```
GET /api/reservations
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "reservation_id",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "customerPhone": "+1234567890",
      "boat": {
        "_id": "boat_id",
        "name": "Ocean Breeze",
        "type": "Yacht"
      },
      "reservationDate": "2024-02-15T00:00:00.000Z",
      "reservationTime": "10:00 AM",
      "numberOfPeople": 5,
      "status": "Pending",
      "notes": "Special occasion",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Reservation
```
GET /api/reservations/:id
```
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "reservation_id",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1234567890",
    "boat": {
      "_id": "boat_id",
      "name": "Ocean Breeze",
      "type": "Yacht"
    },
    "reservationDate": "2024-02-15T00:00:00.000Z",
    "reservationTime": "10:00 AM",
    "numberOfPeople": 5,
    "status": "Pending"
  }
}
```

#### Create Reservation
```
POST /api/reservations
```
**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "boat": "boat_id",
  "reservationDate": "2024-02-15",
  "reservationTime": "10:00 AM",
  "numberOfPeople": 5,
  "notes": "Special occasion"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "reservation_id",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1234567890",
    "boat": {
      "_id": "boat_id",
      "name": "Ocean Breeze"
    },
    "reservationDate": "2024-02-15T00:00:00.000Z",
    "reservationTime": "10:00 AM",
    "numberOfPeople": 5,
    "status": "Pending",
    "notes": "Special occasion"
  }
}
```

#### Update Reservation
```
PUT /api/reservations/:id
```
**Request Body:**
```json
{
  "status": "Confirmed",
  "reservationTime": "11:00 AM"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "reservation_id",
    "customerName": "John Doe",
    "status": "Confirmed",
    "reservationTime": "11:00 AM"
  }
}
```

#### Delete Reservation
```
DELETE /api/reservations/:id
```
**Response:**
```json
{
  "success": true,
  "message": "Reservation deleted successfully"
}
```

## Data Models

### Boat Model
```javascript
{
  name: String (required),
  type: String (required, enum: ['Speedboat', 'Yacht', 'Sailboat', 'Catamaran', 'Fishing Boat', 'Other']),
  capacity: Number (required, min: 1),
  price: Number (required, min: 0),
  description: String,
  image: String,
  available: Boolean (default: true),
  timestamps: true
}
```

### Reservation Model
```javascript
{
  customerName: String (required),
  customerEmail: String (required, validated email),
  customerPhone: String (required),
  boat: ObjectId (ref: 'Boat', required),
  reservationDate: Date (required),
  reservationTime: String (required),
  numberOfPeople: Number (required, min: 1),
  status: String (enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending'),
  notes: String,
  timestamps: true
}
```

## Testing with Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:5000`
3. Test each endpoint with appropriate request bodies
4. Verify responses match the expected format

### Sample Test Flow:
1. **Create a boat** - POST to `/api/boats`
2. **View all boats** - GET from `/api/boats`
3. **Create a reservation** - POST to `/api/reservations` (use boat ID from step 1)
4. **View all reservations** - GET from `/api/reservations`
5. **Update reservation status** - PUT to `/api/reservations/:id`

## Project Structure

```
mern-crash-course-master/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── boat.model.js      # Boat schema
│   │   └── reservation.model.js # Reservation schema
│   ├── controllers/
│   │   ├── boat.controller.js # Boat business logic
│   │   └── reservation.controller.js # Reservation business logic
│   ├── routes/
│   │   ├── boat.routes.js     # Boat API routes
│   │   └── reservation.routes.js # Reservation API routes
│   └── server.js              # Main application entry point
├── .env                       # Environment variables (not in repo)
├── .env.example               # Example environment variables
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Future Enhancements

- User authentication and authorization
- Payment integration
- Real-time availability checking
- Email notifications for reservations
- Frontend integration (React)
- Image upload for boats
- Advanced search and filtering
- Booking calendar view

## License

ISC

## Author

Second Year Project - Phase 2


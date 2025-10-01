import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import boatRoutes from './routes/boat.routes.js';
import reservationRoutes from './routes/reservation.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/boats', boatRoutes);
app.use('/api/reservations', reservationRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to Boat Reservation & Management API',
        endpoints: {
            boats: '/api/boats',
            reservations: '/api/reservations'
        }
    });
});

// Connect to MongoDB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});

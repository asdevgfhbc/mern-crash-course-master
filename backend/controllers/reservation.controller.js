import Reservation from '../models/reservation.model.js';
import Boat from '../models/boat.model.js';

// Get all reservations
export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}).populate('boat');
        res.status(200).json({ success: true, data: reservations });
    } catch (error) {
        console.error('Error fetching reservations:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get single reservation by ID
export const getReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findById(id).populate('boat');
        if (!reservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }
        res.status(200).json({ success: true, data: reservation });
    } catch (error) {
        console.error('Error fetching reservation:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create a new reservation
export const createReservation = async (req, res) => {
    const reservation = req.body;
    
    if (!reservation.customerName || !reservation.customerEmail || !reservation.customerPhone || 
        !reservation.boat || !reservation.reservationDate || !reservation.reservationTime || 
        !reservation.numberOfPeople) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide all required fields: customerName, customerEmail, customerPhone, boat, reservationDate, reservationTime, numberOfPeople' 
        });
    }

    try {
        // Check if boat exists and is available
        const boat = await Boat.findById(reservation.boat);
        if (!boat) {
            return res.status(404).json({ success: false, message: 'Boat not found' });
        }
        if (!boat.available) {
            return res.status(400).json({ success: false, message: 'Boat is not available' });
        }
        if (reservation.numberOfPeople > boat.capacity) {
            return res.status(400).json({ 
                success: false, 
                message: `Number of people exceeds boat capacity of ${boat.capacity}` 
            });
        }

        const newReservation = new Reservation(reservation);
        await newReservation.save();
        
        const populatedReservation = await Reservation.findById(newReservation._id).populate('boat');
        res.status(201).json({ success: true, data: populatedReservation });
    } catch (error) {
        console.error('Error creating reservation:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update a reservation
export const updateReservation = async (req, res) => {
    const { id } = req.params;
    const reservation = req.body;

    try {
        // If boat is being updated, validate it
        if (reservation.boat) {
            const boat = await Boat.findById(reservation.boat);
            if (!boat) {
                return res.status(404).json({ success: false, message: 'Boat not found' });
            }
            if (reservation.numberOfPeople && reservation.numberOfPeople > boat.capacity) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Number of people exceeds boat capacity of ${boat.capacity}` 
                });
            }
        }

        const updatedReservation = await Reservation.findByIdAndUpdate(id, reservation, { 
            new: true,
            runValidators: true 
        }).populate('boat');
        
        if (!updatedReservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }
        
        res.status(200).json({ success: true, data: updatedReservation });
    } catch (error) {
        console.error('Error updating reservation:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete a reservation
export const deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        
        if (!deletedReservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }
        
        res.status(200).json({ success: true, message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error('Error deleting reservation:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

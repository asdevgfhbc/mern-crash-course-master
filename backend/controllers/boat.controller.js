import Boat from '../models/boat.model.js';

// Get all boats
export const getBoats = async (req, res) => {
    try {
        const boats = await Boat.find({});
        res.status(200).json({ success: true, data: boats });
    } catch (error) {
        console.error('Error fetching boats:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get single boat by ID
export const getBoat = async (req, res) => {
    const { id } = req.params;
    try {
        const boat = await Boat.findById(id);
        if (!boat) {
            return res.status(404).json({ success: false, message: 'Boat not found' });
        }
        res.status(200).json({ success: true, data: boat });
    } catch (error) {
        console.error('Error fetching boat:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create a new boat
export const createBoat = async (req, res) => {
    const boat = req.body;
    
    if (!boat.name || !boat.type || !boat.capacity || !boat.price) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide all required fields: name, type, capacity, price' 
        });
    }

    const newBoat = new Boat(boat);

    try {
        await newBoat.save();
        res.status(201).json({ success: true, data: newBoat });
    } catch (error) {
        console.error('Error creating boat:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update a boat
export const updateBoat = async (req, res) => {
    const { id } = req.params;
    const boat = req.body;

    try {
        const updatedBoat = await Boat.findByIdAndUpdate(id, boat, { 
            new: true,
            runValidators: true 
        });
        
        if (!updatedBoat) {
            return res.status(404).json({ success: false, message: 'Boat not found' });
        }
        
        res.status(200).json({ success: true, data: updatedBoat });
    } catch (error) {
        console.error('Error updating boat:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete a boat
export const deleteBoat = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBoat = await Boat.findByIdAndDelete(id);
        
        if (!deletedBoat) {
            return res.status(404).json({ success: false, message: 'Boat not found' });
        }
        
        res.status(200).json({ success: true, message: 'Boat deleted successfully' });
    } catch (error) {
        console.error('Error deleting boat:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

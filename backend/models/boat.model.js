import mongoose from 'mongoose';

const boatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Boat name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Boat type is required'],
        enum: ['Speedboat', 'Yacht', 'Sailboat', 'Catamaran', 'Fishing Boat', 'Other'],
        default: 'Other'
    },
    capacity: {
        type: Number,
        required: [true, 'Boat capacity is required'],
        min: [1, 'Capacity must be at least 1']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: 'default-boat.jpg'
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Boat = mongoose.model('Boat', boatSchema);

export default Boat;

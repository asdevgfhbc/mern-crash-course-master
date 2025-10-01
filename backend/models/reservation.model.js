import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true
    },
    customerEmail: {
        type: String,
        required: [true, 'Customer email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    customerPhone: {
        type: String,
        required: [true, 'Customer phone is required'],
        trim: true
    },
    boat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boat',
        required: [true, 'Boat selection is required']
    },
    reservationDate: {
        type: Date,
        required: [true, 'Reservation date is required']
    },
    reservationTime: {
        type: String,
        required: [true, 'Reservation time is required']
    },
    numberOfPeople: {
        type: Number,
        required: [true, 'Number of people is required'],
        min: [1, 'At least 1 person is required']
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending'
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;

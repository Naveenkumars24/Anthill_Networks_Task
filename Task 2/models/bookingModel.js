const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    busName: { type: String, required: true }, // Store bus name
    userName: { type: String, required: true }, // Store user name
    userEmail: { type: String, required: true }, // Store user email
    seats: { type: Number, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
});

module.exports = mongoose.model('Booking', bookingSchema);
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    category: { type: String, required: true, enum: ['AC', 'Non-AC', 'Sleeper', 'Seater'] },
    ticketPrice: { type: Number, required: true },
    timing: { type: String, required: true },
    estimatedTiming: { type: String, required: true },
    conductorNumber: { type: String, required: true },
});

module.exports = mongoose.model('Bus', busSchema);
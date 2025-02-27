const Bus = require('../models/busModel');
const mongoose = require('mongoose');

const addBus = async (req, res) => {
    const { name, totalSeats, availableSeats, route, category, ticketPrice, timing, estimatedTiming, conductorNumber } = req.body;

    try {
        const bus = new Bus({
            name,
            totalSeats,
            availableSeats,
            route,
            category,
            ticketPrice,
            timing,
            estimatedTiming,
            conductorNumber,
        });
        await bus.save();
        res.status(201).json(bus);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getBuses = async (req, res) => {
    try {
        const buses = await Bus.find().populate('route');
        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getBusById = async (req, res) => {
    const { busId } = req.params;

    try {
        // Validate busId
        if (!mongoose.Types.ObjectId.isValid(busId)) {
            return res.status(400).json({ message: 'Invalid bus ID' });
        }

        // Find the bus by ID
        const bus = await Bus.findById(busId).populate('route'); // Populate route details if needed

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        // Return bus details
        res.json(bus);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { addBus, getBuses, getBusById };
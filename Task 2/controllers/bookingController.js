const Booking = require('../models/bookingModel');
const Bus = require('../models/busModel');
const User = require('../models/userModel'); // Import User model

const mongoose = require('mongoose');

const bookBus = async (req, res) => {
    const { busId, seats } = req.body;
    const userId = req.user.userId;

    try {
        // Validate busId
        if (!mongoose.Types.ObjectId.isValid(busId)) {
            return res.status(400).json({ message: 'Invalid bus ID' });
        }

        // Find the bus
        const bus = await Bus.findById(busId);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if enough seats are available
        if (bus.availableSeats < seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Decrement available seats
        bus.availableSeats -= seats;
        await bus.save();

        // Create the booking
        const booking = new Booking({
            user: userId,
            bus: busId,
            seats,
            busName: bus.name, // Store bus name
            userName: user.name, // Store user name
            userEmail: user.email, // Store user email
        });
        await booking.save();

        // Return booking details and conductor's number
        res.status(201).json({
            message: 'Booking successful',
            booking,
            conductorNumber: bus.conductorNumber,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.json({ message: 'Booking cancelled successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getPassengersByBusId = async (req, res) => {
    const { busId } = req.params;

    try {
        // Find all bookings for the specified bus
        const bookings = await Booking.find({ bus: busId });

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No passengers found for this bus' });
        }

        // Extract passenger details
        const passengers = bookings.map(booking => ({
            user: {
                id: booking.user,
                name: booking.userName,
                email: booking.userEmail,
            },
            bus: {
                id: booking.bus,
                name: booking.busName,
            },
            seats: booking.seats,
            bookingId: booking._id,
            status: booking.status,
        }));

        res.json({ passengers });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { bookBus, cancelBooking, getPassengersByBusId };
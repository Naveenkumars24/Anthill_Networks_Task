const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/bus');
const routeRoutes = require('./routes/route');
const bookingRoutes = require('./routes/booking');

dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/bookings', bookingRoutes);

module.exports = app;
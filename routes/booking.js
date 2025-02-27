const express = require('express');
const { authenticate,authorize } = require('../middlewares/auth');
const { bookBus, cancelBooking ,getPassengersByBusId} = require('../controllers/bookingController');
const router = express.Router();

router.post('/', authenticate, bookBus);
router.put('/:bookingId/cancel', authenticate, cancelBooking);
router.get('/:busId/passengers', authenticate, authorize(['admin']), getPassengersByBusId); // Only admins can access this route

module.exports = router;
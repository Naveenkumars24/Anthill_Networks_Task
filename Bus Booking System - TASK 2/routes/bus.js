const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const { addBus, getBuses ,getBusById} = require('../controllers/busController');
const router = express.Router();

router.post('/', authenticate, authorize(['admin']), addBus);
router.get('/', getBuses);
router.get('/:busId', authenticate, getBusById);

module.exports = router;
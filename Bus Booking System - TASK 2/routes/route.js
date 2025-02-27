const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const { addRoute, getRoutes } = require('../controllers/routeController');
const router = express.Router();

router.post('/', authenticate, authorize(['admin']), addRoute);
router.get('/', getRoutes);

module.exports = router;
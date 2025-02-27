const Route = require('../models/routeModel');

const addRoute = async (req, res) => {
    const { origin, destination, distance } = req.body;

    try {
        const route = new Route({ origin, destination, distance });
        await route.save();
        res.status(201).json(route);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { addRoute, getRoutes };
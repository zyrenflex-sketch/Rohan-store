const express = require('express');
const router = express.Router();

// Mock database for demonstration purposes
let orders = [];

// Create a new order
router.post('/', (req, res) => {
    const { customerName, items } = req.body;
    const newOrder = { id: orders.length + 1, customerName, items, status: 'Pending' };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Get all orders
router.get('/', (req, res) => {
    res.json(orders);
});

// Get an order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
});

// Update an order by ID
router.put('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    
    const { customerName, items, status } = req.body;
    order.customerName = customerName || order.customerName;
    order.items = items || order.items;
    order.status = status || order.status;
    
    res.json(order);
});

// Delete an order by ID
router.delete('/:id', (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) return res.status(404).send('Order not found');
    
    const deletedOrder = orders.splice(orderIndex, 1);
    res.json(deletedOrder);
});

module.exports = router;
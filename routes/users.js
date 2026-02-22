const express = require('express');
const router = express.Router();

// Mock user database
let users = [];

// Register endpoint
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Add validation and save user logic here
    users.push({ username, password });
    res.status(201).send('User registered successfully!');
});

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if user exists and password matches
    const user = users.find(u => u.username === username);
    if (!user || user.password !== password) {
        return res.status(401).send('Invalid credentials!');
    }
    res.status(200).send('Login successful!');
});

// Export the router
module.exports = router;
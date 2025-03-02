const express = require('express');
const router = express.Router();
const db = require('../db'); // Import Firestore instance

// Authentication routes
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userRef = db.collection('users');
    const snapshot = await userRef.where('username', '==', username).get();

    if (snapshot.empty) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = snapshot.docs[0].data();
    if (user.password === password) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const userRef = db.collection('users');
    const existingUser = await userRef.where('username', '==', username).get();

    if (!existingUser.empty) {
        return res.status(400).json({ message: 'User already exists' });
    }

    await userRef.add({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
});

module.exports = router;

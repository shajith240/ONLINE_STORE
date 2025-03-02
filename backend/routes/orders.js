const express = require('express');
const router = express.Router();
const db = require('../db'); // Import Firestore instance

// Get all orders
router.get('/', async (req, res) => {
    const ordersRef = db.collection('orders');
    const snapshot = await ordersRef.get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(orders);
});

// Create a new order
router.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const newOrder = { userId, productId, quantity };
    const docRef = await db.collection('orders').add(newOrder);
    res.status(201).json({ id: docRef.id, ...newOrder });
});

module.exports = router;

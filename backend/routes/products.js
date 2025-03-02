const express = require('express');
const router = express.Router();
const db = require('../db'); // Import Firestore instance

// Get all products
router.get('/', async (req, res) => {
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
});

// Add a new product
router.post('/', async (req, res) => {
    const { name, price } = req.body;
    const newProduct = { name, price };
    const docRef = await db.collection('products').add(newProduct);
    res.status(201).json({ id: docRef.id, ...newProduct });
});

module.exports = router;

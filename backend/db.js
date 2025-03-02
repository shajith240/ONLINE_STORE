const { Firestore } = require('@google-cloud/firestore');

// Create a new Firestore instance
const db = new Firestore();

module.exports = db;

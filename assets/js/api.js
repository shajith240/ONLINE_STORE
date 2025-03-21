const API_URL = 'http://localhost:5000/api';

// Function to login
async function login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}

// Function to register
async function register(username, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}

// Function to get all products
async function getProducts() {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
}

// Function to create a new order
async function createOrder(userId, productId, quantity) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity }),
    });
    return response.json();
}

export { login, register, getProducts, createOrder };

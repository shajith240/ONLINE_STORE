import { login, register } from './api.js';

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await login(username, password);
    alert(response.message);
});

// Handle registration form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await register(username, password);
    alert(response.message);
});

import { getAllProducts, addToCart, getCartItems, updateCartItemQuantity, removeFromCart } from './database.js'

// Function to display products on the page
async function displayProducts() {
    const productContainer = document.querySelector('.product-container')
    const products = await getAllProducts()
    
    productContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image_url || 'placeholder.jpg'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="category">${product.categories?.name || 'Uncategorized'}</p>
            <p class="price">$${product.price}</p>
            <p class="stock">${product.stock_quantity} in stock</p>
            <button onclick="handleAddToCart('${product.id}')" 
                    ${product.stock_quantity === 0 ? 'disabled' : ''}>
                ${product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
        </div>
    `).join('')
}

// Function to handle adding items to cart
async function handleAddToCart(productId) {
    const { success, error } = await addToCart(productId)
    if (!success) {
        if (error === 'Authentication required') {
            // Redirect to login page or show login modal
            showLoginModal()
            return
        }
        alert(`Failed to add to cart: ${error}`)
        return
    }
    
    updateCartCount()
    showSuccessMessage('Product added to cart!')
}

// Function to update cart count in the UI
async function updateCartCount() {
    const cartItems = await getCartItems()
    const cartCount = document.getElementById('cart-count')
    if (cartCount) {
        cartCount.textContent = cartItems.length
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts()
    updateCartCount()
})

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        updateCartCount()
    } else if (event === 'SIGNED_OUT') {
        const cartCount = document.getElementById('cart-count')
        if (cartCount) {
            cartCount.textContent = '0'
        }
    }
})
// Make functions available globally for onclick handlers
window.handleAddToCart = handleAddToCart

// Example of handling protected actions
async function handleAddToCart(productId) {
    const { success, error } = await addToCart(productId)
    if (!success) {
        if (error === 'Authentication required') {
            // Redirect to login page or show login modal
            showLoginModal()
            return
        }
        alert(`Failed to add to cart: ${error}`)
        return
    }
    
    updateCartCount()
    showSuccessMessage('Product added to cart!')
}

// Example of handling profile updates
async function handleProfileUpdate(formData) {
    const success = await updateProfile({
        full_name: formData.get('fullName'),
        address: formData.get('address'),
        phone: formData.get('phone')
    })

    if (success) {
        showSuccessMessage('Profile updated successfully!')
    } else {
        showErrorMessage('Failed to update profile')
    }
}

// Example of handling order creation
async function handleCheckout(shippingAddress) {
    const cartItems = await getCartItems()
    const { success, error, order } = await createOrder(shippingAddress, cartItems)
    
    if (!success) {
        showErrorMessage(`Checkout failed: ${error}`)
        return
    }

    // Redirect to order confirmation page
    window.location.href = `/order-confirmation?id=${order.id}`
}

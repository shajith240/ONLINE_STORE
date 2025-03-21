// Declare cart variable in a scope accessible to all functions
let cart;

class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateCartCount();
        this.initializeCartModal();
    }

    addItem(product) {
        const { name, price, size, quantity, image } = product;
        const existingItem = this.items.find(item => 
            item.name === name && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                name,
                price: parseFloat(price.replace('$', '')),
                size,
                quantity,
                image
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.updateCartModal();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartCount();
        this.updateCartModal();
    }

    updateQuantity(index, quantity) {
        if (quantity > 0 && quantity <= 10) {
            this.items[index].quantity = quantity;
            this.saveCart();
            this.updateCartCount();
            this.updateCartModal();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    calculateTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    initializeCartModal() {
        // Create cart modal HTML
        const cartModal = document.createElement('div');
        cartModal.className = 'cart-modal';
        cartModal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-header">
                    <h2>Your Cart</h2>
                    <button class="cart-close">&times;</button>
                </div>
                <div class="cart-items"></div>
                <div class="cart-footer">
                    <div class="cart-total">Total: $<span>0.00</span></div>
                    <button class="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        `;
        document.body.appendChild(cartModal);

        // Add event listeners
        const cartIcon = document.querySelector('.cart-icon');
        const closeBtn = cartModal.querySelector('.cart-close');

        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartModal.classList.add('active');
            this.updateCartModal();
        });

        closeBtn.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });

        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });
    }

    updateCartModal() {
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total span');
        
        cartItems.innerHTML = this.items.length ? this.items.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                </div>
            </div>
        `).join('') : '<p class="empty-cart">Your cart is empty</p>';

        cartTotal.textContent = this.calculateTotal().toFixed(2);

        // Add event listeners for quantity buttons and remove buttons
        const quantityBtns = cartItems.querySelectorAll('.quantity-btn');
        const removeBtns = cartItems.querySelectorAll('.remove-item');

        quantityBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop event propagation
                const index = parseInt(btn.dataset.index);
                const item = this.items[index];
                if (btn.classList.contains('minus') && item.quantity > 1) {
                    this.updateQuantity(index, item.quantity - 1);
                } else if (btn.classList.contains('plus') && item.quantity < 10) {
                    this.updateQuantity(index, item.quantity + 1);
                }
            });
        });

        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop event propagation
                const index = parseInt(btn.dataset.index);
                this.removeItem(index);
            });
        });
    }
}

// Make sure this code runs after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    cart = new Cart();

    // Debug check - add this temporarily to verify the cart is initialized
    console.log('Cart initialized');
    
    // Add click event listener to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop event propagation
        const cartModal = document.querySelector('.cart-modal');
        cartModal.classList.add('active');
        console.log('Cart icon clicked'); // Debug check
    });

    // Add click event listener to close button
    const closeBtn = document.querySelector('.cart-modal .cart-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop event propagation
            const cartModal = document.querySelector('.cart-modal');
            cartModal.classList.remove('active');
        });
    }

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        const cartModal = document.querySelector('.cart-modal');
        const cartIcon = document.querySelector('.cart-icon');
        
        // Only close if clicking outside cart modal and not on cart icon
        if (cartModal && cartModal.classList.contains('active')) {
            const isClickInsideCart = cartModal.contains(e.target);
            const isClickOnCartIcon = cartIcon.contains(e.target);
            
            if (!isClickInsideCart && !isClickOnCartIcon) {
                cartModal.classList.remove('active');
            }
        }
    });

    // Prevent clicks inside cart modal from closing it
    const cartModal = document.querySelector('.cart-modal');
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop event propagation
        });
    }

    // Add to cart functionality in quick view modal
    const addToCartBtn = document.querySelector('#quickViewModal .add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const modal = document.getElementById('quickViewModal');
            const selectedSize = modal.querySelector('.size-option.active');
            
            if (!selectedSize) {
                alert('Please select a size');
                return;
            }

            const product = {
                name: modal.querySelector('#modalProductName').textContent,
                price: modal.querySelector('#modalProductPrice').textContent,
                size: selectedSize.textContent,
                quantity: parseInt(modal.querySelector('.quantity-input').value),
                image: modal.querySelector('.main-image').src
            };

            cart.addItem(product);
            modal.classList.remove('active');
        });
    }
});

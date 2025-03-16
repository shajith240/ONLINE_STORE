document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('quickViewModal');
    const closeBtn = modal.querySelector('.modal-close');
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    // Product data for all sections
    const products = {
        'Street Style Pro X1': {
            price: '$159.99',
            originalPrice: '$199.99',
            sku: 'SSP-001',
            images: {
                main: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f',
                side: 'https://images.unsplash.com/photo-1544441893-675973e31985',
                back: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
                top: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2'
            },
            stock: 'In Stock',
            description: 'Premium street-style sneakers with advanced comfort technology.'
        },
        'Premium Leather X1': {
            price: '$189.99',
            originalPrice: '$229.99',
            sku: 'PL-002',
            images: {
                main: 'https://images.unsplash.com/photo-1544441893-675973e31985',
                side: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f',
                back: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
                top: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2'
            },
            stock: 'In Stock',
            description: 'Luxurious leather sneakers for ultimate comfort and style.'
        },
        'Urban Classic X1': {
            price: '$169.99',
            originalPrice: '$199.99',
            sku: 'UC-003',
            images: {
                main: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
                side: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f',
                back: 'https://images.unsplash.com/photo-1544441893-675973e31985',
                top: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2'
            },
            stock: 'In Stock',
            description: 'Classic urban design with modern comfort features.'
        },
        'Comfort Plus X1': {
            price: '$149.99',
            sku: 'CP-004',
            images: {
                main: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
                side: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
                back: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
                top: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2'
            },
            stock: 'In Stock',
            description: 'Maximum comfort for everyday wear.'
        },
        'Sport Elite X1': {
            price: '$179.99',
            sku: 'SE-005',
            images: {
                main: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
                side: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
                back: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
                top: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2'
            },
            stock: 'In Stock',
            description: 'High-performance sports shoes for athletes.'
        },
        'Limited Edition Runner X1': {
            price: '$199.99',
            originalPrice: '$199.99',
            sku: 'LER-007',
            images: {
                main: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
                side: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
                back: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
                top: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2'
            },
            stock: 'In Stock',
            description: 'Limited edition running shoes with special features.'
        },
        'Urban Comfort X1': {
            price: '$111.99',
            originalPrice: '$159.99',
            sku: 'UC-008',
            images: {
                main: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
                side: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
                back: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
                top: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2'
            },
            stock: 'In Stock',
            description: 'Urban style meets ultimate comfort.'
        }
    };

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle quick view button clicks
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const card = button.closest('.product-card');
            const productName = card.querySelector('h3').textContent.trim();
            const product = products[productName];

            if (product) {
                // Reset modal state
                resetModalState();

                // Update modal content
                modal.querySelector('#modalProductName').textContent = productName;
                modal.querySelector('#modalProductPrice').textContent = product.price;
                
                // Handle original price display
                const modalOriginalPrice = modal.querySelector('#modalOriginalPrice');
                if (product.originalPrice) {
                    modalOriginalPrice.textContent = product.originalPrice;
                    modalOriginalPrice.style.display = 'inline-block';
                } else {
                    modalOriginalPrice.style.display = 'none';
                }

                // Update product details
                modal.querySelector('#modalProductSku').textContent = product.sku;
                updateStockStatus(product.stock);
                modal.querySelector('#modalProductDescription').textContent = product.description;

                // Setup thumbnail gallery
                setupThumbnailGallery(product);

                // Show modal
                modal.classList.add('active');
            }
        });
    });

    // Function to handle thumbnail gallery setup and interactions
    function setupThumbnailGallery(product) {
        const thumbnails = modal.querySelectorAll('.thumbnail');
        const mainImage = modal.querySelector('.main-image');

        thumbnails.forEach(thumb => {
            const angle = thumb.dataset.angle;
            const thumbImg = thumb.querySelector('img');
            
            thumbImg.src = product.images[angle];
            thumbImg.alt = `${angle} view`;
            
            thumb.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImage.src = product.images[angle];
                mainImage.alt = `${angle} view of ${product.name}`;
            });
        });

        // Set initial main image
        mainImage.src = product.images.main;
        mainImage.alt = `Main view of ${product.name}`;
        modal.querySelector('[data-angle="main"]').classList.add('active');
    }

    // Function to update stock status display
    function updateStockStatus(status) {
        const stockElement = modal.querySelector('#modalStockStatus');
        stockElement.textContent = status;
        stockElement.className = 'stock-status';
        stockElement.classList.add(status.toLowerCase().replace(/\s+/g, '-'));
    }

    // Function to reset modal state
    function resetModalState() {
        const sizeOptions = modal.querySelectorAll('.size-option');
        sizeOptions.forEach(opt => opt.classList.remove('active'));

        const quantityInput = modal.querySelector('.quantity-input');
        if (quantityInput) {
            quantityInput.value = 1;
        }

        const wishlistBtn = modal.querySelector('.add-to-wishlist');
        if (wishlistBtn) {
            wishlistBtn.classList.remove('active');
        }

        const mainImage = modal.querySelector('.main-image');
        mainImage.style.transform = 'scale(1)';
        mainImage.style.opacity = '1';
    }

    // Handle size selection
    const sizeOptions = modal.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Handle quantity controls
    const quantityInput = modal.querySelector('.quantity-input');
    const minusBtn = modal.querySelector('.quantity-btn.minus');
    const plusBtn = modal.querySelector('.quantity-btn.plus');

    // Prevent direct input and keyboard events
    quantityInput.addEventListener('keydown', (e) => {
        e.preventDefault();
        return false;
    });

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
});

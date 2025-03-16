class ProductsPage {
    constructor() {
        this.productsGrid = document.querySelector('.products-grid');
        this.categoryFilter = document.getElementById('category-filter');
        this.sortFilter = document.getElementById('sort-filter');
        this.pageTitle = document.querySelector('.products-title');
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.loading = false;
        
        this.initialize();
    }

    initialize() {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const title = urlParams.get('title');
        
        // Update page title if provided
        if (title) {
            this.pageTitle.textContent = decodeURIComponent(title);
        }
        
        // Set initial category
        if (category) {
            this.categoryFilter.value = category;
        }

        // Add event listeners
        this.categoryFilter.addEventListener('change', () => this.filterProducts());
        this.sortFilter.addEventListener('change', () => this.filterProducts());

        // Add loading state handler
        this.productsGrid.addEventListener('transitionend', () => {
            if (this.loading) {
                this.productsGrid.style.opacity = '1';
                this.loading = false;
            }
        });

        // Initial load with animation
        this.loadProducts();
    }

    async loadProducts() {
        try {
            this.loading = true;
            this.productsGrid.style.opacity = '0.5';
            
            // Show loading indicator
            this.productsGrid.innerHTML = '<div class="loading-spinner"></div>';
            
            const products = await this.fetchProducts();
            
            // Apply filters
            let filteredProducts = this.filterProductsData(products);
            
            // Apply sorting
            filteredProducts = this.sortProducts(filteredProducts);
            
            // Add slight delay for smooth transition
            setTimeout(() => {
                this.renderProducts(filteredProducts);
            }, 300);
            
        } catch (error) {
            console.error('Error loading products:', error);
            this.productsGrid.innerHTML = `
                <div class="error-message">
                    <p>Sorry, we couldn't load the products.</p>
                    <button onclick="window.location.reload()">Try Again</button>
                </div>
            `;
        }
    }

    filterProductsData(products) {
        const category = this.categoryFilter.value;
        if (!category) return products;
        
        return products.filter(product => {
            if (category === 'trending') return product.trending;
            if (category === 'new') return product.isNew;
            if (category === 'sale') return product.status === 'sale';
            return product.category === category;
        });
    }

    sortProducts(products) {
        const sortBy = this.sortFilter.value;
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'newest':
                    return new Date(b.dateAdded) - new Date(a.dateAdded);
                default:
                    return 0;
            }
        });
    }

    async fetchProducts() {
        try {
            // First try to fetch from the API
            const response = await fetch('/backend/routes/products');
            if (!response.ok) throw new Error('API fetch failed');
            return await response.json();
        } catch (error) {
            console.warn('Falling back to mock data:', error);
            // Fallback to mock data
            return [
                {
                    id: 1,
                    name: "Classic Sneakers",
                    price: 99.99,
                    image: "/assets/images/products/sneaker-1.jpg",
                    category: "sneakers",
                    status: "in-stock",
                    trending: true,
                    isNew: false,
                    dateAdded: "2024-01-15"
                },
                // Add more mock products...
            ];
        }
    }

    createProductCard(product) {
        const statusClass = product.status.toLowerCase().replace(/\s+/g, '-');
        const statusText = product.status === 'sale' ? 'On Sale' : 'In Stock';
        
        return `
            <div class="product-card ${statusClass}" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <button class="quick-view-btn" aria-label="Quick view">
                        <img src="/assets/icons/eye.svg" alt="Quick view" class="quick-view-icon">
                    </button>
                    ${product.trending ? '<span class="badge trending">Trending</span>' : ''}
                    ${product.isNew ? '<span class="badge new">New</span>' : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <p class="stock-status ${statusClass}">${statusText}</p>
                </div>
            </div>
        `;
    }

    renderProducts(products) {
        if (products.length === 0) {
            this.productsGrid.innerHTML = `
                <div class="no-products">
                    <p>No products found matching your criteria.</p>
                    <button onclick="window.location.href='/pages/products.html'">View All Products</button>
                </div>
            `;
            return;
        }

        this.productsGrid.innerHTML = products.map(product => 
            this.createProductCard(product)
        ).join('');

        // Initialize quick view functionality for new cards
        const quickViewButtons = this.productsGrid.querySelectorAll('.quick-view-btn');
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = button.closest('.product-card');
                const productId = card.dataset.productId;
                // Trigger quick view modal (assuming you have this functionality)
                this.openQuickView(productId);
            });
        });
    }

    openQuickView(productId) {
        // This should integrate with your existing quick view functionality
        // Trigger the quick view modal for the specific product
        if (window.triggerQuickView) {
            window.triggerQuickView(productId);
        }
    }

    filterProducts() {
        const category = this.categoryFilter.value;
        const sortBy = this.sortFilter.value;
        
        // Update URL with new filters
        const url = new URL(window.location);
        if (category) {
            url.searchParams.set('category', category);
        } else {
            url.searchParams.delete('category');
        }
        window.history.pushState({}, '', url);

        // Reload products with new filters
        this.loadProducts();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductsPage();
});
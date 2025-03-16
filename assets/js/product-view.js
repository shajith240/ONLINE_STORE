class ProductView {
    constructor() {
        this.categories = {
            'trending': { title: 'Trending Products', filter: 'trending' },
            'new-arrivals': { title: 'New Arrivals', filter: 'new' },
            'special-sale': { title: 'Special Sale Items', filter: 'sale' }
        };
        this.initialize();
    }

    initialize() {
        const seeAllButtons = document.querySelectorAll('.see-all-btn');
        seeAllButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const category = button.dataset.category;
                this.navigateToProducts(category);
            });
        });

        // Add event listener for shop now button
        const shopNowBtn = document.querySelector('.hero-buttons .btn');
        if (shopNowBtn) {
            shopNowBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '/pages/products.html';
            });
        }
    }

    navigateToProducts(category) {
        if (!this.categories[category]) return;
        
        const params = new URLSearchParams();
        params.set('category', this.categories[category].filter);
        params.set('title', this.categories[category].title);
        
        // Navigate to products page with parameters
        window.location.href = `/pages/products.html?${params.toString()}`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductView();
});
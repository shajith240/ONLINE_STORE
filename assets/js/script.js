const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".mobile-menu-toggle");

function toggleMobileMenu(force = null) {
    const isOpen = force !== null ? force : !navLinks.classList.contains("active");
    navLinks.classList.toggle("active", isOpen);
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
}

menuToggle.addEventListener("click", () => toggleMobileMenu());

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        navLinks.classList.contains("active")) {
        toggleMobileMenu(false);
    }
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
        toggleMobileMenu(false);
    }
});

// Close menu on window resize
window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
        toggleMobileMenu(false);
    }
});

const themeSwitch = document.querySelector('.theme-switch__checkbox');
const rootElement = document.documentElement;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply theme on page load
if (currentTheme) {
    rootElement.setAttribute('data-theme', currentTheme);
    themeSwitch.checked = currentTheme === 'dark';
}

// Handle theme switch
themeSwitch.addEventListener('change', function() {
    const newTheme = this.checked ? 'dark' : 'light';
    
    // Add transition class
    rootElement.classList.add('theme-transition');
    
    // Change theme
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remove transition class after animation
    setTimeout(() => {
        rootElement.classList.remove('theme-transition');
    }, 300);
});

let lastScrollTop = 0;
window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector(".navbar");
    const announcementBar = document.querySelector(".announcement-bar");
    const announcementHeight = announcementBar.offsetHeight;
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        navbar.style.transform = `translateY(-${announcementHeight + navbar.offsetHeight}px)`;
        announcementBar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
        announcementBar.style.transform = "translateY(0)";
    }
    lastScrollTop = currentScroll;
});

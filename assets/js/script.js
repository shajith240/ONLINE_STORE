document.addEventListener('DOMContentLoaded', function() {
    // Hide loader when page is loaded
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Wait for fade out animation to complete
    }
});

document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll handling
  let lastScroll = 0;
  const navbar = document.querySelector(".navbar");
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      navbar.classList.remove("hidden");
      return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains("hidden")) {
      navbar.classList.add("hidden");
    } else if (currentScroll < lastScroll && navbar.classList.contains("hidden")) {
      navbar.classList.remove("hidden");
    }
    
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks?.classList.toggle("active");
  });
});

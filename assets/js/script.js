document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  console.log("Menu Toggle:", menuToggle);
  console.log("Nav Links:", navLinks);

  // Mobile Menu
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (navLinks) {
        navLinks.classList.toggle("active");
      }
      menuToggle.classList.toggle("active");
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Set initial theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggle.checked = currentTheme === "dark";

  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // Close Mobile Menu
  document.addEventListener("click", (e) => {
    if (
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      navLinks.classList.contains("active")
    ) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        alert("Please fill all required fields");
        return
      }
      contactForm.reset();
      alert("Message sent successfully!");
    });
  }

  // Copyright Year
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});

// Typing Effect
const typingTexts = [
  "Step Into Luxury",
  "Walk With Confidence",
  "Discover Your Style",
  "Experience Comfort",
];

let currentTextIndex = 0;
const typingContainer = document.querySelector(".typing-container");
const caret = document.querySelector(".typing-caret");

function typeText() {
  const text = typingTexts[currentTextIndex];
  let charIndex = 0;

  typingContainer.innerHTML = "";
  caret.style.opacity = "1";

  function type() {
    if (charIndex < text.length) {
      typingContainer.innerHTML += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      caret.style.opacity = "0";
      setTimeout(nextText, 2000);
    }
  }

  type();
}

function nextText() {
  currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
  typeText();
}

// Initialize typing effect
typeText();

// Add hover class to all buttons
document.querySelectorAll(".btn").forEach((btn) => {
  // Remove any existing hover-effect class
  btn.classList.remove("hover-effect");

  // Add proper button styling
  btn.style.textTransform = "uppercase";
  btn.style.fontWeight = "600";
  btn.style.letterSpacing = "0.5px";
});

// Add this to your script.js
const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
  const marqueeContent = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML = marqueeContent + marqueeContent; // Duplicate content for continuous scroll
}

// Card hover z-index management
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.zIndex = "3";
  });

  card.addEventListener("mouseleave", () => {
    card.style.zIndex = "1";
  });
});

// Set the current year dynamically in the footer
document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

// Loading Screen Handler
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");

  // Show main content immediately
  if (mainContent) {
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
  }

  // Hide loader after a short delay
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  }, 1000);
});

// Reviews Data
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

// Create Review Card HTML
function createReviewCard(review) {
  return `
    <figure class="review-card">
      <div class="review-header">
        <img src="${review.img}" alt="${review.name}" />
        <div class="review-info">
          <figcaption class="review-name">${review.name}</figcaption>
          <p class="review-username">${review.username}</p>
        </div>
      </div>
      <blockquote class="review-body">${review.body}</blockquote>
    </figure>
  `;
}

// Initialize Reviews Section
function initializeReviews() {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  const reviewsSection = document.getElementById("reviews");
  if (!reviewsSection) return;

  // Clear existing content
  reviewsSection.querySelector(".container").innerHTML = `
    <h2>Customer Reviews</h2>
    <div class="marquee-container">
      <div class="marquee-track">
        ${firstRow.map(createReviewCard).join("")}
        ${firstRow.map(createReviewCard).join("")}
        ${firstRow.map(createReviewCard).join("")}
      </div>
    </div>
    <div class="marquee-container reverse">
      <div class="marquee-track">
        ${secondRow.map(createReviewCard).join("")}
        ${secondRow.map(createReviewCard).join("")}
        ${secondRow.map(createReviewCard).join("")}
      </div>
    </div>
  `;

  // Setup smooth infinite scroll
  const tracks = document.querySelectorAll(".marquee-track");

  tracks.forEach((track) => {
    // Clone the first set of cards and append to create seamless loop
    const firstCard = track.firstElementChild;
    const lastCard = track.lastElementChild;

    // Reset animation when near the end
    const resetAnimation = () => {
      track.style.animation = "none";
      track.offsetHeight; // Trigger reflow
      track.style.animation = null;
    };

    // Create an observer for the first and last cards
    const options = {
      root: track.parentElement,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetAnimation();
        }
      });
    }, options);

    observer.observe(firstCard);
    observer.observe(lastCard);

    // Handle mouse interactions
    track.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused";
    });

    track.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running";
    });
  });
}

// Initialize reviews when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeReviews();
});

// Scroll Animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.dataset.delay || 0;

          setTimeout(() => {
            element.classList.add("show");
          }, delay);

          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "50px",
    }
  );

  // Initialize animations for different sections
  function initializeSection(selector, baseDelay = 0) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.add("hidden");
      element.dataset.delay = baseDelay;
      observer.observe(element);
    });
  }

  // Hero section
  initializeSection(".hero-text, .hero-image", 0);

  // Product grid as a single unit
  initializeSection(".product-grid", 100);

  // Review containers as single units
  initializeSection(".marquee-container", 200);

  // Footer columns
  initializeSection(".footer-column", 100);

  // Additional sections
  initializeSection(".latest-collection", 150);
  initializeSection(".instagram", 200);
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupScrollAnimations();
});

// Refresh animations on dynamic content load
function refreshScrollAnimations() {
  setupScrollAnimations();
}

// Navbar visibility handling
const navbar = document.querySelector(".navbar");
let isNavbarVisible = false;
let lastScrollTop = 0;

function handleNavbarVisibility() {
  const currentScrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const showThreshold = viewportHeight * 0.1; // Show navbar only in top 10% of viewport

  // Only show navbar when near the top of the page
  const shouldShowNavbar = currentScrollTop <= showThreshold;

  if (shouldShowNavbar && !isNavbarVisible) {
    navbar.classList.remove("hidden");
    navbar.classList.add("visible");
    isNavbarVisible = true;
  } else if (!shouldShowNavbar && isNavbarVisible) {
    navbar.classList.remove("visible");
    navbar.classList.add("hidden");
    isNavbarVisible = false;
  }

  lastScrollTop = currentScrollTop;
}

// Add scroll event listener with throttling for better performance
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleNavbarVisibility();
      ticking = false;
    });
    ticking = true;
  }
});

// Initialize navbar visibility check
document.addEventListener("DOMContentLoaded", () => {
  handleNavbarVisibility();
});

// Handle resize events
window.addEventListener("resize", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleNavbarVisibility();
      ticking = false;
    });
    ticking = true;
  }
});

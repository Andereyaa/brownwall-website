// Hero Slider Functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

// Auto-advance slides
setInterval(nextSlide, slideInterval);

// Manual navigation with dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function toggleBio(button) {
    const bio = button.previousElementSibling;
    const isCollapsed = bio.classList.contains('collapsed');
    const buttonText = button.querySelector('span');
    const icon = button.querySelector('i');
    
    if (isCollapsed) {
        // Expand bio
        bio.classList.remove('collapsed');
        bio.classList.add('expanded');
        buttonText.textContent = 'Read Less';
        button.classList.add('expanded');
    } else {
        // Collapse bio
        bio.classList.remove('expanded');
        bio.classList.add('collapsed');
        buttonText.textContent = 'Read More';
        button.classList.remove('expanded');
    }
}

// Handle image loading errors gracefully
document.querySelectorAll('.team-photo img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        // Show the fallback icon
        const icon = this.nextElementSibling;
        if (icon) {
            icon.style.display = 'block';
        }
    });
    
    img.addEventListener('load', function() {
        // Hide the fallback icon when image loads successfully
        const icon = this.nextElementSibling;
        if (icon) {
            icon.style.display = 'none';
        }
    });
});

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours to schedule your consultation.');
    this.reset();
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for scroll animations
document.querySelectorAll('.service-card, .team-member, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Add counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : element.textContent.includes('+') ? '+' : '');
        }
    }, 20);
}

// Animate stats when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            const text = number.textContent;
            const value = parseInt(text.replace(/[^0-9]/g, ''));
            animateCounter(number, value);
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Add mobile menu toggle (basic implementation)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.nav-container');
        const menu = document.querySelector('.nav-menu');

        if (!document.querySelector('.mobile-toggle')) {
            const toggle = document.createElement('div');
            toggle.className = 'mobile-toggle';
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
            toggle.style.cssText = 'color: white; font-size: 1.5rem; cursor: pointer; display: block;';

            toggle.addEventListener('click', () => {
                menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
                menu.style.flexDirection = 'column';
                menu.style.position = 'absolute';
                menu.style.top = '100%';
                menu.style.left = '0';
                menu.style.width = '100%';
                menu.style.background = 'rgba(26, 35, 56, 0.98)';
                menu.style.padding = '1rem';
            });

            navbar.appendChild(toggle);
        }
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = navMenu.innerHTML;
    document.querySelector('.navbar').appendChild(mobileMenu);
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
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
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all feature cards and metric cards
    document.querySelectorAll('.feature-card, .metric-card, .review-card').forEach(el => {
        observer.observe(el);
    });
    // Checkout widget animation - triggers on scroll
    const checkoutSection = document.querySelector('.checkout-flow');
    const checkoutCards = document.querySelectorAll('.checkout-card');
    
    if (checkoutCards.length > 0 && checkoutSection) {
        let hasAnimated = false;
        let currentStep = 0;
        let animationInterval;
        
        function animateCheckout() {
            // Remove active from all
            checkoutCards.forEach(card => card.classList.remove('active'));
            
            // Add active to current
            checkoutCards[currentStep].classList.add('active');
            
            // Move to next step
            currentStep++;
            
            // Check if we've shown all cards
            if (currentStep >= checkoutCards.length) {
                // Animation complete - show all cards
                clearInterval(animationInterval);
                setTimeout(() => {
                    checkoutCards.forEach(card => card.classList.add('active'));
                }, 500); // Small delay before showing all
            }
        }
        
        // Create observer for scroll trigger
        const checkoutObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    // Start the animation sequence
                    animateCheckout();
                    animationInterval = setInterval(animateCheckout, 2500);
                }
            });
        }, {
            threshold: 0.3  // Trigger when 30% visible
        });
        
        // Start observing
        checkoutObserver.observe(checkoutSection);
        // In the setTimeout after showing all cards, add:
        // checkoutSection.classList.add('animation-complete');
    }
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    .mobile-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 20px;
        margin-top: 10px;
        display: none;
        flex-direction: column;
        gap: 16px;
        box-shadow: var(--shadow-lg);
    }
    
    .mobile-menu.active {
        display: flex;
    }
    
    .mobile-menu a {
        padding: 12px;
        border-radius: 8px;
        transition: background 0.3s;
    }
    
    .mobile-menu a:hover {
        background: rgba(124, 58, 237, 0.1);
    }
    
    .nav-mobile-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-mobile-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-mobile-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
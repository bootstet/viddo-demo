// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Layout Toggle functionality
    const layoutToggle = document.getElementById('layoutToggle');
    const layoutDropdown = document.getElementById('layoutDropdown');
    const layoutOptions = document.querySelectorAll('.layout-option');
    
    // Load saved layout
    const savedLayout = localStorage.getItem('layout') || 'default';
    document.body.setAttribute('data-layout', savedLayout);
    updateActiveLayout(savedLayout);
    
    // Toggle layout dropdown
    if (layoutToggle) {
        layoutToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            layoutDropdown.classList.toggle('show');
            // Close theme dropdown if open
            if (themeDropdown) {
                themeDropdown.classList.remove('show');
            }
        });
    }
    
    // Handle layout selection
    layoutOptions.forEach(option => {
        option.addEventListener('click', function() {
            const layout = this.getAttribute('data-layout');
            applyLayout(layout);
            layoutDropdown.classList.remove('show');
        });
    });
    
    // Apply layout function
    function applyLayout(layout) {
        document.body.style.transition = 'all 0.3s ease';
        document.body.setAttribute('data-layout', layout);
        localStorage.setItem('layout', layout);
        updateActiveLayout(layout);
        showLayoutNotification(layout);
    }
    
    // Update active layout
    function updateActiveLayout(layout) {
        layoutOptions.forEach(option => {
            if (option.getAttribute('data-layout') === layout) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // Show layout notification
    function showLayoutNotification(layout) {
        const layoutNames = {
            default: 'Default Layout',
            compact: 'Compact Layout',
            wide: 'Wide Layout',
            minimal: 'Minimal Layout'
        };
        
        const existingNotif = document.querySelector('.layout-notification');
        if (existingNotif) {
            existingNotif.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'layout-notification';
        notification.textContent = layoutNames[layout];
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
    
    // Theme Toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeDropdown = document.getElementById('themeDropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'purple';
    document.body.setAttribute('data-theme', savedTheme);
    updateActiveTheme(savedTheme);
    
    // Toggle dropdown
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            themeDropdown.classList.toggle('show');
            // Close layout dropdown if open
            if (layoutDropdown) {
                layoutDropdown.classList.remove('show');
            }
        });
    }
    
    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
            themeDropdown.classList.remove('show');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.theme-selector')) {
            themeDropdown.classList.remove('show');
        }
        if (!e.target.closest('.layout-selector')) {
            layoutDropdown.classList.remove('show');
        }
    });
    
    // Apply theme function
    function applyTheme(theme) {
        document.body.style.transition = 'all 0.3s ease';
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateActiveTheme(theme);
        showThemeNotification(theme);
    }
    
    // Update active state
    function updateActiveTheme(theme) {
        themeOptions.forEach(option => {
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // Show theme notification
    function showThemeNotification(theme) {
        const themeNames = {
            purple: 'Purple-Pink',
            blue: 'Blue-Cyan',
            green: 'Green-Emerald',
            orange: 'Orange-Red',
            pink: 'Pink-Rose'
        };
        
        // Remove existing notification
        const existingNotif = document.querySelector('.theme-notification');
        if (existingNotif) {
            existingNotif.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = `Theme: ${themeNames[theme]}`;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
    
    // Promo banner close functionality
    const promoClose = document.querySelector('.promo-close');
    const promoBanner = document.querySelector('.promo-banner');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    
    if (promoClose && promoBanner) {
        promoClose.addEventListener('click', function() {
            promoBanner.classList.add('hidden');
            navbar.classList.add('promo-closed');
            hero.classList.add('promo-closed');
        });
    }
    
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe scroll fade elements
    const scrollFadeElements = document.querySelectorAll('.scroll-fade');
    scrollFadeElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Counter Animation for Stats
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    const statItems = document.querySelectorAll('.scroll-count');
    statItems.forEach(item => {
        counterObserver.observe(item);
    });
    
    // Counter Animation Function
    function animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        const target = parseFloat(numberElement.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            if (target >= 1) {
                numberElement.textContent = current.toFixed(1);
            } else {
                numberElement.textContent = Math.round(current);
            }
        }, 16);
    }
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Pause carousel on hover
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Button hover effects with ripple
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Feature cards hover effect with tilt
    const featureCards = document.querySelectorAll('.feature-card, .benefit-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroVideo = document.querySelector('.hero-video');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        
        if (heroVideo && scrolled < window.innerHeight) {
            heroVideo.style.transform = `scale(${1 + scrolled * 0.0005})`;
        }
    });
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Model cards interactive animation
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add cursor trail effect (optional, can be removed if too much)
    let cursorTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', function(e) {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    });
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Console message
    console.log('%c🎨 Viddo AI Clone', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 14px; color: #8b5cf6;');
    console.log('%cFeatures: Animations, Scroll Effects, Parallax, and more!', 'font-size: 12px; color: #a8a8b8;');
});

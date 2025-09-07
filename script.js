// Global variables
let currentPage = 'home';
let isMenuOpen = false;
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isSwipeEnabled = true;

// DOM elements
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-menu-link');
const pages = document.querySelectorAll('.page');
const progressFill = document.querySelector('.progress-fill');
const fabBtn = document.getElementById('fabBtn');
const profileImage = document.getElementById('profileImage');
const swipeIndicator = document.getElementById('swipeIndicator');

// Page navigation
const pageOrder = ['home', 'about', 'portfolio', 'blog'];

function updateProgress(pageId) {
    const pageIndex = pageOrder.indexOf(pageId);
    const progress = ((pageIndex + 1) / pageOrder.length) * 100;
    progressFill.style.width = progress + '%';
}

function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update active nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeDesktopLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    const activeMobileLink = document.querySelector(`.mobile-menu-link[data-page="${pageId}"]`);
    
    if (activeDesktopLink) activeDesktopLink.classList.add('active');
    if (activeMobileLink) activeMobileLink.classList.add('active');
    
    // Update progress and current page
    currentPage = pageId;
    updateProgress(pageId);
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Reset animations for new page
    resetAnimations(pageId);
    
    // Hide swipe indicator after first navigation
    if (pageId !== 'home') {
        swipeIndicator.style.display = 'none';
    }
    
    // Add haptic feedback on mobile
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

function resetAnimations(pageId) {
    const page = document.getElementById(pageId);
    if (!page) return;
    
    setTimeout(() => {
        if (pageId === 'about') {
            animateSkillCards();
        } else if (pageId === 'portfolio') {
            animatePortfolioGrid();
        } else if (pageId === 'blog') {
            animateCertificateGrid();
        }
    }, 100);
}

// Mobile menu functions
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add stagger animation to menu items
    const menuItems = document.querySelectorAll('.mobile-menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100 + 100);
    });
}

function closeMobileMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
}

// Touch and swipe handling
function handleTouchStart(e) {
    if (!isSwipeEnabled) return;
    
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
    if (!isSwipeEnabled) return;
    
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    
    handleSwipe();
}

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Check if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const currentIndex = pageOrder.indexOf(currentPage);
        
        if (deltaX > 0 && currentIndex > 0) {
            // Swipe right - go to previous page
            showPage(pageOrder[currentIndex - 1]);
        } else if (deltaX < 0 && currentIndex < pageOrder.length - 1) {
            // Swipe left - go to next page
            showPage(pageOrder[currentIndex + 1]);
        }
    }
}

// Animation functions
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animatePortfolioGrid() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function animateCertificateGrid() {
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Utility functions
function openProject(url) {
    showNotification('Opening project...');
    setTimeout(() => {
        window.open(url, '_blank');
    }, 500);
}

function openCertificate(url) {
    showNotification('Opening certificate...');
    setTimeout(() => {
        window.open(url, '_blank');
    }, 500);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        color: #ff6b9d;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
        z-index: 10000;
        animation: slideInFromTop 0.5s ease, slideOutToTop 0.5s ease 2s forwards;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 2500);
}

// Event listeners
hamburgerBtn.addEventListener('click', toggleMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Navigation event listeners
[...navLinks, ...mobileNavLinks].forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        showPage(pageId);
        
        // Add click feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

// Touch event listeners for swipe
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: false });

// Prevent scrolling on swipe areas
document.querySelectorAll('.swipe-area').forEach(area => {
    area.addEventListener('touchmove', (e) => {
        if (isSwipeEnabled) {
            e.preventDefault();
        }
    }, { passive: false });
});

// Profile image interaction
if (profileImage) {
    let tiltTimeout;
    
    profileImage.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = profileImage.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;
        
        const rotateX = (y / rect.height) * 15;
        const rotateY = (x / rect.width) * 15;
        
        profileImage.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.05)`;
        
        // Create heart effect
        createHeartEffect(touch.clientX, touch.clientY);
        
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
    });
    
    profileImage.addEventListener('touchend', () => {
        clearTimeout(tiltTimeout);
        tiltTimeout = setTimeout(() => {
            profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        }, 100);
    });
}

// FAB button functionality
let fabMenuOpen = false;
fabBtn.addEventListener('click', () => {
    if (!fabMenuOpen) {
        showFabMenu();
    } else {
        hideFabMenu();
    }
});

function showFabMenu() {
    fabMenuOpen = true;
    fabBtn.innerHTML = '×';
    
    const fabMenu = document.createElement('div');
    fabMenu.id = 'fabMenu';
    fabMenu.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1001;
    `;
    
    const actions = [
        { icon: '🏠', action: () => showPage('home'), title: 'Home' },
        { icon: '👤', action: () => showPage('about'), title: 'About' },
        { icon: '💼', action: () => showPage('portfolio'), title: 'Portfolio' },
        { icon: '🏆', action: () => showPage('blog'), title: 'Certificates' }
    ];
    
    actions.forEach((action, index) => {
        const btn = document.createElement('button');
        btn.style.cssText = `
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #ff6b9d, #ff8fa3);
            color: white;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease;
            transform: scale(0);
            box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
        `;
        
        btn.innerHTML = action.icon;
        btn.title = action.title;
        btn.addEventListener('click', () => {
            action.action();
            hideFabMenu();
        });
        
        fabMenu.appendChild(btn);
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, index * 100);
    });
    
    document.body.appendChild(fabMenu);
}

function hideFabMenu() {
    fabMenuOpen = false;
    fabBtn.innerHTML = '✨';
    
    const fabMenu = document.getElementById('fabMenu');
    if (fabMenu) {
        const buttons = fabMenu.querySelectorAll('button');
        buttons.forEach((btn, index) => {
            setTimeout(() => {
                btn.style.transform = 'scale(0)';
            }, index * 50);
        });
        
        setTimeout(() => {
            fabMenu.remove();
        }, buttons.length * 50 + 200);
    }
}

// Heart effect function
function createHeartEffect(x, y) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.cssText = `
                position: fixed;
                left: ${x - 10 + Math.random() * 20}px;
                top: ${y - 10 + Math.random() * 20}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 10000;
                animation: floatUp 2s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 2000);
        }, i * 150);
    }
}

// Skill card interactions
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('touchstart', (e) => {
        card.style.transform = 'scale(0.98)';
        
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    });
    
    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 100);
    });
    
    card.addEventListener('click', () => {
        const skillType = card.getAttribute('data-skill');
        showSkillDetails(skillType);
    });
});

function showSkillDetails(skillType) {
    const skillMessages = {
        design: 'Graphic Design: 5+ years creating visual identities, logos, and marketing materials',
        brand: 'Brand Identity: Specialized in developing cohesive brand experiences across all touchpoints',
        social: 'Social Media: Expert in content creation, community management, and social strategy',
        art: 'Digital Art: Proficient in illustration, digital painting, and creative compositions'
    };
    
    showNotification(skillMessages[skillType] || 'Click to learn more about this skill!');
}

// Portfolio item interactions
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('touchstart', (e) => {
        item.style.transform = 'scale(0.98)';
        
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    });
    
    item.addEventListener('touchend', () => {
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 100);
    });
});

// Certificate item interactions
document.querySelectorAll('.certificate-item').forEach(item => {
    item.addEventListener('touchstart', (e) => {
        item.style.transform = 'scale(0.98)';
        const badge = item.querySelector('.certificate-badge');
        badge.style.transform = 'scale(1.1) rotate(5deg)';
        
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    });
    
    item.addEventListener('touchend', () => {
        const badge = item.querySelector('.certificate-badge');
        setTimeout(() => {
            item.style.transform = 'scale(1)';
            badge.style.transform = 'scale(1) rotate(0deg)';
        }, 100);
    });
});

// Social media interactions
document.querySelectorAll('.social-icon, .mobile-social-link').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        
        const title = icon.getAttribute('title') || 'Social Media';
        showNotification(`Opening ${title}...`);
        
        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = icon.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        icon.style.position = 'relative';
        icon.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
        
        if ('vibrate' in navigator) {
            navigator.vibrate([50, 50, 50]);
        }
    });
});

// View Portfolio button
document.getElementById('viewPortfolioBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showPage('portfolio');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (isMenuOpen) return;
    
    const currentIndex = pageOrder.indexOf(currentPage);
    
    switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            if (currentIndex < pageOrder.length - 1) {
                showPage(pageOrder[currentIndex + 1]);
            }
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            if (currentIndex > 0) {
                showPage(pageOrder[currentIndex - 1]);
            }
            break;
        case 'Escape':
            if (isMenuOpen) {
                closeMobileMenu();
            }
            if (fabMenuOpen) {
                hideFabMenu();
            }
            break;
        case ' ':
            e.preventDefault();
            if (currentIndex < pageOrder.length - 1) {
                showPage(pageOrder[currentIndex + 1]);
            } else {
                showPage(pageOrder[0]);
            }
            break;
    }
});

// Mouse wheel navigation disabled - only use horizontal scroll for navigation
let wheelTimeout;
document.addEventListener('wheel', (e) => {
    if (window.innerWidth <= 768) return; // Only on desktop
    if (wheelTimeout) return;
    
    // Only respond to horizontal wheel movement (shift + scroll)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 50) {
        wheelTimeout = setTimeout(() => {
            wheelTimeout = null;
        }, 1000);
        
        const currentIndex = pageOrder.indexOf(currentPage);
        
        if (e.deltaX > 0 && currentIndex < pageOrder.length - 1) {
            showPage(pageOrder[currentIndex + 1]);
        } else if (e.deltaX < 0 && currentIndex > 0) {
            showPage(pageOrder[currentIndex - 1]);
        }
    }
});

// Parallax effect for particles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.1 + (index * 0.02);
        particle.style.transform = `translateY(${scrolled * speed}px) translateX(${Math.sin(scrolled * 0.001 + index) * 10}px)`;
    });
});

// Add dynamic styles
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes slideInFromTop {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutToTop {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-80px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shimmer {
        0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
            opacity: 0;
        }
    }
    
    .floating-element {
        position: fixed;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 3s ease-out forwards;
    }
`;
document.head.appendChild(dynamicStyles);

// Initialize app
function initializeApp() {
    // Set initial state
    updateProgress('home');
    
    // Hide swipe indicator after 5 seconds
    setTimeout(() => {
        if (swipeIndicator) {
            swipeIndicator.style.opacity = '0';
            swipeIndicator.style.transform = 'translateY(20px)';
        }
    }, 5000);
    
    // Add entrance animations
    setTimeout(() => {
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach((icon, index) => {
            icon.style.opacity = '0';
            icon.style.transform = 'translateX(100px)';
            
            setTimeout(() => {
                icon.style.transition = 'all 0.5s ease';
                icon.style.opacity = '1';
                icon.style.transform = 'translateX(0)';
            }, 1500 + (index * 100));
        });
    }, 100);
    
    // Enable swipe after initial load
    setTimeout(() => {
        isSwipeEnabled = true;
    }, 1000);
}

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
    
    // Hide FAB menu on resize
    if (fabMenuOpen) {
        hideFabMenu();
    }
});

// Handle visibility change (when user switches tabs)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Prevent default touch behaviors on interactive elements
document.querySelectorAll('button, a, .skill-card, .portfolio-item, .certificate-item').forEach(element => {
    element.addEventListener('touchstart', (e) => {
        e.stopPropagation();
    });
});

// Add loading state management
let isLoading = false;
function setLoadingState(loading) {
    isLoading = loading;
    document.body.style.pointerEvents = loading ? 'none' : '';
    
    if (loading) {
        document.body.style.cursor = 'wait';
    } else {
        document.body.style.cursor = '';
    }
}

// Performance optimization: Throttle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize logic here
        console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
    }, 250);
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add to home screen prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show custom install button or notification
    showNotification('Add Pink Lolita to your home screen!');
});
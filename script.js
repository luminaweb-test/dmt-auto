// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Spotlight effect following cursor
const spotlight = document.querySelector('.spotlight');
let mouseX = 0;
let mouseY = 0;
let spotX = 0;
let spotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateSpotlight() {
    const dx = mouseX - spotX;
    const dy = mouseY - spotY;

    spotX += dx * 0.1;
    spotY += dy * 0.1;

    spotlight.style.left = (spotX - 300) + 'px';
    spotlight.style.top = (spotY - 300) + 'px';

    requestAnimationFrame(animateSpotlight);
}
animateSpotlight();

// Smooth scroll
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

// Navbar hide on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate service cards with stagger
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 600ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 100}ms, transform 600ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 100}ms`;
    observer.observe(card);
});

// Animate gallery items with stagger
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(40px)';
    item.style.transition = `opacity 600ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 80}ms, transform 600ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 80}ms`;
    observer.observe(item);
});

// Animate info items
document.querySelectorAll('.info-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-40px)';
    item.style.transition = `opacity 600ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 100}ms, transform 600ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 100}ms`;
    observer.observe(item);
});

// Animate section headers
document.querySelectorAll('.section-header').forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'opacity 600ms cubic-bezier(0.23, 1, 0.32, 1), transform 600ms cubic-bezier(0.23, 1, 0.32, 1)';
    observer.observe(header);
});

// 3D tilt effect on service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Button ripple effect
document.querySelectorAll('.btn, .card-btn, .nav-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            will-change: transform, opacity;
        `;

        this.appendChild(ripple);

        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            fill: 'forwards'
        }).onfinish = () => ripple.remove();
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const successMsg = document.createElement('div');
        successMsg.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #ffd700;"></i>
                <div style="font-size: 1.8rem; font-weight: 700;">Message Sent!</div>
                <div style="opacity: 0.8;">We'll get back to you within 24 hours.</div>
            </div>
        `;
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            color: white;
            padding: 4rem 5rem;
            border-radius: 24px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
            z-index: 10000;
            text-align: center;
            border: 1px solid rgba(255, 215, 0, 0.3);
            will-change: transform, opacity;
        `;

        document.body.appendChild(successMsg);

        successMsg.animate([
            { transform: 'translate(-50%, -50%) scale(0.9)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.05)', opacity: 1, offset: 0.5 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            fill: 'forwards'
        });

        contactForm.reset();

        setTimeout(() => {
            successMsg.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(0.9)', opacity: 0 }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                fill: 'forwards'
            }).onfinish = () => successMsg.remove();
        }, 3000);
    });
}

// Parallax effect on hero
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            const heroMesh = document.querySelector('.hero-mesh');

            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
            }

            if (heroMesh && scrolled < window.innerHeight) {
                heroMesh.style.transform = `translateY(${scrolled * 0.15}px)`;
            }

            ticking = false;
        });
        ticking = true;
    }
});

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const number = parseInt(text.replace(/\D/g, ''));

                let current = 0;
                const increment = number / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                }, 16);
            });
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Gallery item 3D effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        }
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
        el.style.transform = 'none';
    });
}

// Add shimmer effect to featured card
const featuredCard = document.querySelector('.service-card.featured');
if (featuredCard && !prefersReducedMotion) {
    setInterval(() => {
        const shine = featuredCard.querySelector('.card-shine');
        if (shine) {
            shine.style.left = '-100%';
            setTimeout(() => {
                shine.style.transition = 'left 1000ms ease';
                shine.style.left = '100%';
            }, 100);
            setTimeout(() => {
                shine.style.transition = 'left 600ms ease';
            }, 1100);
        }
    }, 5000);
}

// Smooth reveal for booking section
const bookingContainer = document.querySelector('.booking-container');
if (bookingContainer) {
    bookingContainer.style.opacity = '0';
    bookingContainer.style.transform = 'translateY(40px)';
    bookingContainer.style.transition = 'opacity 600ms cubic-bezier(0.23, 1, 0.32, 1), transform 600ms cubic-bezier(0.23, 1, 0.32, 1)';
    observer.observe(bookingContainer);
}

// Contact grid animation
const contactGrid = document.querySelector('.contact-grid');
if (contactGrid) {
    const contactInfo = contactGrid.querySelector('.contact-info');
    const contactFormEl = contactGrid.querySelector('.contact-form');

    if (contactInfo) {
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateX(-40px)';
        contactInfo.style.transition = 'opacity 600ms cubic-bezier(0.23, 1, 0.32, 1), transform 600ms cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(contactInfo);
    }

    if (contactFormEl) {
        contactFormEl.style.opacity = '0';
        contactFormEl.style.transform = 'translateX(40px)';
        contactFormEl.style.transition = 'opacity 600ms cubic-bezier(0.23, 1, 0.32, 1) 200ms, transform 600ms cubic-bezier(0.23, 1, 0.32, 1) 200ms';
        observer.observe(contactFormEl);
    }
}

console.log('🚗 Syracuse Auto Spa - Premium luxury detailing website loaded');
console.log('✨ High-end design with sophisticated animations and interactions');

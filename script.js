
// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2500);
});

// Cursor Toggle Panel
const normalCursorBtn = document.getElementById('normalCursor');
const pikachuCursorBtn = document.getElementById('pikachuCursor');
const cursorNormal = document.getElementById('cursorNormal');
const cursorPikachu = document.getElementById('cursorPikachu');

normalCursorBtn.addEventListener('click', () => {
    normalCursorBtn.classList.add('active');
    pikachuCursorBtn.classList.remove('active');

    cursorNormal.style.display = 'block';
    cursorPikachu.style.display = 'none';

    // Update cursor tracking
    updateCursorTracking('normal');
});

pikachuCursorBtn.addEventListener('click', () => {
    pikachuCursorBtn.classList.add('active');
    normalCursorBtn.classList.remove('active');

    cursorNormal.style.display = 'none';
    cursorPikachu.style.display = 'block';

    // Update cursor tracking
    updateCursorTracking('pikachu');
});

// Cursor Tracking Function
function updateCursorTracking(type) {
    // Remove existing event listeners
    document.removeEventListener('mousemove', handleNormalCursor);
    document.removeEventListener('mousemove', handlePikachuCursor);

    // Add appropriate event listeners
    if (type === 'normal') {
        document.addEventListener('mousemove', handleNormalCursor);
    } else if (type === 'pikachu') {
        document.addEventListener('mousemove', handlePikachuCursor);
    }
}

// Normal Cursor Handler
function handleNormalCursor(e) {
    cursorNormal.style.left = e.clientX + 'px';
    cursorNormal.style.top = e.clientY + 'px';
}

// Pikachu Cursor Handler
function handlePikachuCursor(e) {
    cursorPikachu.style.left = e.clientX + 'px';
    cursorPikachu.style.top = e.clientY + 'px';
}

// Initialize with normal cursor
updateCursorTracking('normal');

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .portfolio-card, .stat-card, .contact-item');
interactiveElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        if (cursorNormal.style.display !== 'none') {
            cursorNormal.classList.add('hover');
        }
        if (cursorPikachu.style.display !== 'none') {
            cursorPikachu.classList.add('hover');
        }
    });
    elem.addEventListener('mouseleave', () => {
        if (cursorNormal.style.display !== 'none') {
            cursorNormal.classList.remove('hover');
        }
        if (cursorPikachu.style.display !== 'none') {
            cursorPikachu.classList.remove('hover');
        }
    });
});

// Navigation Arrows
const sections = document.querySelectorAll('section');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');
let currentSectionIndex = 0;

function updateArrows() {
    // Update previous arrow
    if (currentSectionIndex === 0) {
        prevArrow.classList.add('disabled');
    } else {
        prevArrow.classList.remove('disabled');
    }

    // Update next arrow
    if (currentSectionIndex === sections.length - 1) {
        nextArrow.classList.add('disabled');
    } else {
        nextArrow.classList.remove('disabled');
    }
}

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    currentSectionIndex = index;
    sections[index].scrollIntoView({ behavior: 'smooth' });
    updateArrows();
}

prevArrow.addEventListener('click', () => {
    scrollToSection(currentSectionIndex - 1);
});

nextArrow.addEventListener('click', () => {
    scrollToSection(currentSectionIndex + 1);
});

// Update current section index on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionIndex = index;
            updateArrows();
        }
    });
});

// Initialize arrows
updateArrows();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Smooth Scrolling
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

// Typing Effect
const typingTexts = [
    'Java Developer',
    'Spring Boot Expert',
    'Full Stack Developer',
    'Web Developer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typingText');

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, pauseTime);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }

    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

typeText();

// Animated Counter
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animate, 1);
            } else {
                counter.innerText = target + '+';
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

animateCounter();

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Show toast notification
    const toast = document.getElementById('toast');
    toast.classList.add('show');

    // Reset form
    e.target.reset();

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
});

// Reveal on Scroll - Fixed version
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Initial check on page load
setTimeout(() => {
    revealOnScroll();
}, 100);

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Add floating animation to character
const character = document.querySelector('.character-illustration');
if (character) {
    character.style.animation = 'float 6s ease-in-out infinite';
}

// Parallax effect for gradient orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Performance optimization - Throttle scroll events
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

function updateScrollEffects() {
    // Update scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', requestTick);

// Touch device optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}
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

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission (replace with actual backend logic)
        console.log('Form Data:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a backend:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message.');
        });
        */
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe project cards and service items
document.querySelectorAll('.project-card, .service-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = entry.target;
            const finalValue = target.textContent;
            const isPercentage = finalValue.includes('%');
            const hasPlus = finalValue.includes('+');
            const numValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
            
            let current = 0;
            const increment = numValue / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= numValue) {
                    target.textContent = finalValue;
                    clearInterval(counter);
                    target.classList.add('counted');
                } else {
                    const displayValue = Math.floor(current);
                    target.textContent = displayValue + (isPercentage ? '%' : hasPlus ? '+' : '');
                }
            }, stepTime);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
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
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add mouse parallax effect to hero section
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        heroImage.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
}

// Parallax effect for decorative arrows
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const arrows = document.querySelectorAll('.decorative-arrow');
    
    arrows.forEach((arrow, index) => {
        const speed = (index + 1) * 0.1;
        arrow.style.transform = `rotate(${45 + index * 180}deg) translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to the greeting (optional)
const greetingElement = document.querySelector('.greeting');
if (greetingElement) {
    const originalText = greetingElement.textContent;
    greetingElement.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            greetingElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'linear-gradient(to bottom, var(--bg-primary), transparent)';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }
});

// Gallery Lightbox Functionality
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxButtons = document.querySelectorAll('.lightbox-btn');

// Open lightbox
lightboxButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const imageUrl = this.getAttribute('data-image');
        lightboxImage.src = imageUrl;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        lightboxImage.src = '';
    }, 300);
}

lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightboxModal.addEventListener('click', function(e) {
    if (e.target === lightboxModal) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
    }
});

// Observe gallery items for animation
document.querySelectorAll('.gallery-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

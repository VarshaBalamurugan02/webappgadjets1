document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay (animation)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor interaction with clickable elements
    const clickableElements = document.querySelectorAll('a, button, .cat-card, input, textarea');
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(0, 243, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Parallax / Antigravity Mouse Move Effect for Hero
    const heroSection = document.querySelector('.hero-section');
    const floatingItems = document.querySelectorAll('.levitating-phone, .floating-accessory');

    heroSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;

        floatingItems.forEach(item => {
            // Add a subtle shift opposite to mouse direction
            const speed = item.classList.contains('levitating-phone') ? 2 : 4;
            item.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });
    
    // Reset transform on mouse leave
    heroSection.addEventListener('mouseleave', () => {
        floatingItems.forEach(item => {
            item.style.transform = 'translateX(0) translateY(0)';
            // Re-apply animation via CSS class if needed, but CSS animation 'float' continues
        });
    });


    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Submission
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Transmitting...';
        btn.style.opacity = '0.7';

        // Simulate network request
        setTimeout(() => {
            btn.innerText = 'Transmission Successful!';
            btn.style.background = '#00ff88'; // Success Green
            btn.style.color = '#000';
            btn.style.borderColor = '#00ff88';
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                btn.innerText = originalText;
                btn.removeAttribute('style'); // Clear inline styles to revert to CSS
            }, 3000);
        }, 1500);
    });

    // Scroll Reveal Animation (Simple visibility check)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Select elements to animate on scroll
    const hiddenElements = document.querySelectorAll('.product-card, .cat-card, .benefit-item');
    hiddenElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

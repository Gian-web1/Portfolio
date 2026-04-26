document.addEventListener('DOMContentLoaded', function () {
    // SMOOTH SCROLL - NO OVERLAP
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });



    // Navbar scroll effect ONLY
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(() => {
                document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Fade-in animations ONLY
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    // Stagger animation for cards
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-card, .project-card, .skill-item').forEach((el, index) => {
        staggerObserver.observe(el);
    });

    // Skill progress bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach((bar, barIndex) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    }, barIndex * 150);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skills-section').forEach(section => {
        skillObserver.observe(section);
    });

    // Scroll progress bar
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #60a5fa, #3b82f6);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progress.style.width = scrolled + '%';
    });

    const subtitle = "Building beautiful, performant web experiences with modern tools";
    let i = 0;
    const speed = 40; // typing speed

    function typeWriter() {
        if (i < subtitle.length) {
            document.querySelector('.hero-subtitle').textContent += subtitle.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Run when page loads
    window.addEventListener("load", () => {
        document.querySelector('.hero-subtitle').textContent = "";
        typeWriter();
    });

    // Preloader
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
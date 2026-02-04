// Floating hearts
function createHearts() {
    const container = document.getElementById('hearts');
    const heartSymbols = ['♥', '♡', '❤', '💕'];

    function spawnHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 16 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
        heart.style.animationDelay = '0s';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 16000);
    }

    // Spawn hearts periodically
    setInterval(spawnHeart, 2000);
    // Initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(spawnHeart, i * 400);
    }
}

// Sparkle particles
function createSparkles() {
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(sparkle);
    }
}

// Envelope interaction
function setupEnvelope() {
    const envelope = document.getElementById('envelope');
    const heroText = document.getElementById('heroText');

    envelope.addEventListener('click', () => {
        envelope.classList.add('opened');

        setTimeout(() => {
            heroText.classList.remove('hidden');
            heroText.classList.add('visible');
        }, 1000);
    });
}

// Scroll animations (Intersection Observer)
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe letter
    const letter = document.querySelector('.letter-container');
    if (letter) observer.observe(letter);

    // Observe final section
    const final = document.querySelector('.final-content');
    if (final) observer.observe(final);
}

// Mouse trail hearts (desktop only)
function setupMouseTrail() {
    if (window.matchMedia('(pointer: fine)').matches) {
        let lastTrail = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTrail < 150) return;
            lastTrail = now;

            const trail = document.createElement('span');
            trail.textContent = '♥';
            trail.style.position = 'fixed';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.fontSize = '14px';
            trail.style.color = '#f5c6ec';
            trail.style.transition = 'all 1s ease';
            trail.style.opacity = '0.8';
            document.body.appendChild(trail);

            requestAnimationFrame(() => {
                trail.style.transform = `translateY(-30px) scale(0.3)`;
                trail.style.opacity = '0';
            });

            setTimeout(() => trail.remove(), 1000);
        });
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    createSparkles();
    setupEnvelope();
    setupScrollAnimations();
    setupMouseTrail();
});

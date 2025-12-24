document.addEventListener('DOMContentLoaded', () => {
    // Fade-in cards on scroll
    const cards = document.querySelectorAll('.service-card, .dept-card, .doctor-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });
});
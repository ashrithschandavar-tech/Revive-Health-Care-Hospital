document.addEventListener('DOMContentLoaded', () => {
    // Fade-in cards when they enter viewport
    const cards = document.querySelectorAll('.service-card, .dept-card, .doctor-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // optional: only once
            }
        });
    }, { 
        threshold: 0.15 
    });

    cards.forEach(card => observer.observe(card));

    // Optional: simple form success message (you can expand later)
    const form = document.getElementById('appointment-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Thank you! Your appointment request has been submitted.\n(Real backend not connected yet)");
            form.reset();
        });
    }
});
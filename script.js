document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Appointment booked successfully! (This is a demo)');
            form.reset();
        });

        // Preselect doctor if coming from doctors page
        const urlParams = new URLSearchParams(window.location.search);
        const doctor = urlParams.get('doctor');
        if (doctor) {
            const select = document.getElementById('doctor');
            select.value = doctor;
        }
    }
});
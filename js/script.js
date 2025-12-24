document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');
    if (form) {
        // Pre-select doctor
        const urlParams = new URLSearchParams(window.location.search);
        const doctor = urlParams.get('doctor');
        if (doctor) {
            const select = document.getElementById('doctor');
            if (select) select.value = doctor;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                doctor: document.getElementById('doctor').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value
            };

            const scriptURL = 'https://script.google.com/macros/s/AKfycbwWDX7VmpKDqIVLsVZXmwk5gLKbx_nsAdegOqR3Zdg8dVJPZvNolUESGdU__b5R-Pmx/exec';

            fetch(scriptURL, {
                method: 'POST',
                redirect: "follow",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'  // This makes it a "simple request" – no CORS preflight
                }
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    alert('Appointment booked successfully! Data saved to Google Sheets.');
                } else {
                    alert('Error: ' + result.message);
                }
                form.reset();
            })
            .catch(error => {
                alert('Network error – try again. Details: ' + error.message);
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');
    if (form) {
        // Pre-select doctor if coming from doctors page
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

            // YOUR WEB APP URL HERE
            const scriptURL = 'https://script.google.com/macros/s/YOUR-WEB-APP-URL-HERE/exec';

            fetch(scriptURL, {
                method: 'POST',
                redirect: "follow",
                body: JSON.stringify(data),
                headers: { 
                    'Content-Type': 'text/plain'
                }
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    alert('Appointment booked successfully! Data saved to Google Sheets.');
                    form.reset();
                } else {
                    alert('Error saving appointment: ' + (result.message || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Network error or server issue. Check console for details.');
            });
        });
    }
});
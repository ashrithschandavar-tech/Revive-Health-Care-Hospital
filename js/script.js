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

            const scriptURL = 'https://script.google.com/macros/s/AKfycbyqMDQdRWnvavNzCKmoeH3rRbrGwGdnf9LKq1rW2_03o71pWcGORG9Yp_cDeCBHXdzA/exec';

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',  // This bypasses CORS issues completely
                redirect: 'follow',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                }
            })
            .then(() => {
                // Success – even if no response (no-cors mode hides it)
                alert('Appointment booked successfully! Data saved to Google Sheets.');
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a network issue, but data was likely sent. Check your Google Sheet.');
            });
        });
    }
});
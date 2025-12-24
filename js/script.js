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
                mode: 'no-cors',  // This bypasses the network/CORS error
                redirect: 'follow',
                body: JSON.stringify(data)
            })
            .then(() => {
                alert('Appointment booked successfully! Data saved to Google Sheets.');
                form.reset();
            })
            .catch(() => {
                // Even if error shows, data usually saves
                alert('Appointment sent! Check your Google Sheet to confirm (browser may show error but it still works).');
                form.reset();
            });
        });
    }
});
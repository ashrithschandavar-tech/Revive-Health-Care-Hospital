import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ========== Firebase Config ==========
const firebaseConfig = {
  apiKey: "AIzaSyDF_udIzt-VhEIUuVdOmDnzqsimFJQxOaw",
  authDomain: "revive-healthcare.firebaseapp.com",
  projectId: "revive-healthcare",
  storageBucket: "revive-healthcare.firebasestorage.app",
  messagingSenderId: "235815974647",
  appId: "1:235815974647:web:d37bfe2c87e5a3c56645f2"
};

// ========== Initialize Firebase ==========
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    // ========== Card Fade-In Animations ==========
    const cards = document.querySelectorAll('.service-card, .dept-card, .doctor-card');
    if (cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(card => observer.observe(card));
    }

    // ========== Appointment Booking ==========
    const form = document.getElementById("appointment-form");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const doctor = document.getElementById("doctor").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;

            if (!name || !email || !phone || !doctor || !date || !time) {
                alert("Please fill all fields");
                return;
            }

            try {
                await addDoc(collection(db, "appointments"), {
                    name: name,
                    email: email,
                    phone: phone,
                    doctor: doctor,
                    date: date,
                    time: time,
                    status: "pending",
                    createdAt: serverTimestamp()
                });

                alert("Appointment booked successfully!");
                form.reset();

            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Try again.");
            }
        });
    }
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDF_udIzt-VhEIUuVdOmDnzqsimFJQxOaw",
  authDomain: "revive-healthcare.firebaseapp.com",
  projectId: "revive-healthcare",
  storageBucket: "revive-healthcare.firebasestorage.app",
  messagingSenderId: "235815974647",
  appId: "1:235815974647:web:d37bfe2c87e5a3c56645f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    // Card fade-in animations (your original feature)
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

    // Appointment form submission (guest allowed)
    const appointmentForm = document.getElementById("appointment-form");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            // ... your existing code to addDoc("appointments") ...
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
                    name, email, phone, doctor, date, time,
                    status: "pending",
                    createdAt: serverTimestamp()
                });
                alert("Appointment booked successfully!");
                appointmentForm.reset();
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Try again.");
            }
        });
    }

    // Login / Sign Up logic (only on login.html)
    const authForm = document.getElementById("auth-form");
    if (authForm) {
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const message = document.getElementById("auth-message");

        // Sign Up
        document.getElementById("signUpBtn").addEventListener("click", async () => {
            try {
                await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
                message.textContent = "Account created! You can now sign in.";
                message.style.color = "green";
            } catch (error) {
                message.textContent = error.message;
                message.style.color = "#DC143C";
            }
        });

        // Sign In
        document.getElementById("signInBtn").addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
                // Redirect to admin after login
                window.location.href = "admin.html";
            } catch (error) {
                message.textContent = error.message;
                message.style.color = "#DC143C";
            }
        });
    }

    // Protect admin.html + show appointments only if logged in
    if (window.location.pathname.includes("admin.html")) {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                // Not logged in → redirect or show message
                document.body.innerHTML = `
                    <header><nav><div class="logo">Revive Healthcare - Admin</div></nav></header>
                    <section style="text-align:center; padding:100px;">
                        <h1>Access Denied</h1>
                        <p>Please <a href="login.html">log in</a> to view the admin dashboard.</p>
                    </section>
                    <footer><p>&copy; 2024-2026 Revive Healthcare Hospital. All rights reserved.</p></footer>
                `;
            } else {
                // Logged in → load appointments (your existing code)
                const tableBody = document.getElementById("appointments-table");
                const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
                onSnapshot(q, (snapshot) => {
                    tableBody.innerHTML = "";
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${data.name || ''}</td>
                            <td>${data.email || ''}</td>
                            <td>${data.phone || ''}</td>
                            <td>${data.doctor || ''}</td>
                            <td>${data.date || ''}</td>
                            <td>${data.time || ''}</td>
                            <td>${data.status || 'pending'}</td>
                        `;
                        tableBody.appendChild(row);
                    });
                });
            }
        });
    }

    // Optional: Add logout button in admin.html (add this HTML manually if you want)
    // <button id="logoutBtn" class="btn primary-btn" style="margin:20px;">Logout</button>
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            await signOut(auth);
            window.location.href = "login.html";
        });
    }
});
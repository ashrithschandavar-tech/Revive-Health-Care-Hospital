import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config (same as before)
const firebaseConfig = {
  apiKey: "AIzaSyDF_udIzt-VhEIUuVdOmDnzqsimFJQxOaw",
  authDomain: "revive-healthcare.firebaseapp.com",
  projectId: "revive-healthcare",
  storageBucket: "revive-healthcare.firebasestorage.app",
  messagingSenderId: "235815974647",
  appId: "1:235815974647:web:d37bfe2c87e5a3c56645f2"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Table body
const tableBody = document.getElementById("appointments-table");

// Query ordered by time
const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
    tableBody.innerHTML = "";

    snapshot.forEach((doc) => {
        const data = doc.data();

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            <td>${data.doctor}</td>
            <td>${data.date}</td>
            <td>${data.time}</td>
            <td>${data.status}</td>
        `;

        tableBody.appendChild(row);
    });
});

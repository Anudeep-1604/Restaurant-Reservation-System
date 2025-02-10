let seatsLeft = 50;
let reservations = [];

const form = document.getElementById('reservation-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const guestsInput = document.getElementById('guests');
const seatsLeftSpan = document.getElementById('seats-left');
const reservationTableBody = document.querySelector('#reservation-table tbody');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const guests = parseInt(guestsInput.value);

    // Check for duplicate names
    if (reservations.some(reservation => reservation.name === name)) {
        alert('This name is already reserved.');
        return;
    }

    if (guests > seatsLeft) {
        alert('Not enough seats available!');
        return;
    }

    const reservation = {
        name: name,
        phone: phone,
        guests: guests,
        checkInTime: new Date().toLocaleString(),
        checkedOut: false
    };

    reservations.push(reservation);
    seatsLeft -= guests;
    updateUI();

    // Reset form fields
    nameInput.value = '';
    phoneInput.value = '';
    guestsInput.value = '';
});

function updateUI() {
    // Update seats left display
    seatsLeftSpan.textContent = seatsLeft;

    // Update reservation table
    reservationTableBody.innerHTML = '';
    reservations.forEach((reservation, index) => {
        const row = document.createElement('tr');

        const checkOutButton = reservation.checkedOut ?
            `<span>Checked Out</span>` :
            `<button class="checkout" onclick="checkout(${index})">Click to Checkout</button>`;

        row.innerHTML = `
            <td>${reservation.name}</td>
            <td>${reservation.phone}</td>
            <td>${reservation.checkInTime}</td>
            <td>${checkOutButton}</td>
            <td><button class="delete" onclick="deleteReservation(${index})">Delete</button></td>
        `;
        reservationTableBody.appendChild(row);
    });
}

function checkout(index) {
    const reservation = reservations[index];
    if (!reservation.checkedOut) {
        reservation.checkedOut = true;
        seatsLeft += reservation.guests;
        updateUI();
    }
}

function deleteReservation(index) {
    const reservation = reservations[index];
    if (!reservation.checkedOut) {
        seatsLeft += reservation.guests;
    }
    reservations.splice(index, 1);
    updateUI();
}

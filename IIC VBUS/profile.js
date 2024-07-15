// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Event listener for logout
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        // Redirect to login page after logout
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
});

// Function to show sections with animation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
            section.classList.add('fade-in');
        } else {
            section.style.display = 'none';
            section.classList.remove('fade-in');
        }
    });
}

// Fetch and display user information and fee details
auth.onAuthStateChanged(user => {
    if (user) {
        const uid = user.uid;
        db.collection('users').doc(uid).get().then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                document.getElementById('user-name').textContent = userData.name;
                document.getElementById('user-email').textContent = userData.email;
                document.getElementById('user-phone').textContent = userData.phone;

                // Populate fee receipts and transactions
                populateFeeReceipts(userData.feeReceipts);
                populateFeeDetails(userData.transactions, 'transactions-body');
            } else {
                console.log("No such document!");
            }
        }).catch(error => {
            console.log("Error getting document:", error);
        });
    } else {
        // No user is signed in, redirect to login
        window.location.href = 'login.html';
    }
});

function populateFeeReceipts(feeReceipts) {
    const feeReceiptsBody = document.getElementById('fee-receipts-body');
    feeReceiptsBody.innerHTML = ''; // Clear any existing receipts
    feeReceipts.forEach(receipt => {
        const receiptDiv = document.createElement('div');
        receiptDiv.classList.add('fee-receipt');

        const receiptHeader = document.createElement('h4');
        receiptHeader.textContent = `Transaction ID: ${receipt.transactionId}`;
        receiptDiv.appendChild(receiptHeader);

        const amountP = document.createElement('p');
        amountP.textContent = `Amount: ${receipt.amount}`;
        receiptDiv.appendChild(amountP);

        const dateP = document.createElement('p');
        dateP.textContent = `Date: ${receipt.date}`;
        receiptDiv.appendChild(dateP);

        const statusP = document.createElement('p');
        statusP.textContent = `Status: ${receipt.status}`;
        receiptDiv.appendChild(statusP);

        feeReceiptsBody.appendChild(receiptDiv);
    });
}

function populateFeeDetails(details, elementId) {
    const tableBody = document.getElementById(elementId);
    tableBody.innerHTML = ''; // Clear any existing rows
    details.forEach(detail => {
        const row = document.createElement('div');
        row.classList.add('fee-receipt'); // Reuse the same styling as fee receipts

        const transactionIdCell = document.createElement('p');
        transactionIdCell.textContent = `Transaction ID: ${detail.transactionId}`;
        row.appendChild(transactionIdCell);

        const amountCell = document.createElement('p');
        amountCell.textContent = `Amount: ${detail.amount}`;
        row.appendChild(amountCell);

        const dateCell = document.createElement('p');
        dateCell.textContent = `Date: ${detail.date}`;
        row.appendChild(dateCell);

        const statusCell = document.createElement('p');
        statusCell.textContent = `Status: ${detail.status}`;
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    });
}

// Function to animate star effect on click
function animateStars(x, y) {
    const star = document.createElement('div');
    star.className = 'star';
    document.body.appendChild(star);

    // Position star at clicked coordinates
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Remove star after animation
    setTimeout(() => {
        star.remove();
    }, 1000); // Adjust animation duration as needed
}

// Function to initiate blinking effect on buttons
function blinkEffect(button) {
    button.classList.add('blinking');
    setTimeout(() => {
        button.classList.remove('blinking');
    }, 2000); // Adjust blinking duration as needed
}

// Event delegation for navigation buttons
document.querySelector('.navigation-buttons').addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        const buttonRect = button.getBoundingClientRect();
        const x = buttonRect.left + button.offsetWidth / 2;
        const y = buttonRect.top + button.offsetHeight / 2;
        animateStars(x, y);
        
        // Trigger blinking effect on the clicked button
        blinkEffect(button);
    }
});

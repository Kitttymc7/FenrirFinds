// Import Firebase & Firestore
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { app } from "./firebase-config.js"; // Ensure you are importing the Firebase app

// Initialize Firestore
const db = getFirestore(app);

// Reference to "Deals" collection
const dealsCollection = collection(db, "Deals");

// Fetch Deals from Firestore and Display Them
async function fetchDeals() {
    try {
        const querySnapshot = await getDocs(dealsCollection);
        let dealsHTML = '';

        querySnapshot.forEach((doc) => {
            const deal = doc.data();
            dealsHTML += `
                <div class="deal">
                    <img src="${deal.Image}" alt="${deal.Title}" width="150">
                    <h3>${deal.Title}</h3>
                    <p>Price: $${deal.Price}</p>
                    <p>Rating: ⭐${deal.Rating}</p>
                    <a href="${deal.AffiliateLinks}" target="_blank">Shop Now</a>
                </div>
            `;
        });

        // Insert Deals into the "trending-deals" section in index.html
        document.getElementById("trending-deals").innerHTML = dealsHTML;
    } catch (error) {
        console.error("Error fetching deals: ", error);
    }
}

// Call the function to load deals when the page loads
fetchDeals();

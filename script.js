// Import Firestore functions
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Get Firestore database reference
const db = getFirestore();

// Reference to "Deals" collection
const dealsCollection = collection(db, "Deals");

// Fetch deals from Firestore and display them
async function fetchDeals() {
    const querySnapshot = await getDocs(dealsCollection);
    let dealsHTML = "";

    querySnapshot.forEach((doc) => {
        const deal = doc.data();
        dealsHTML += `
            <div class="deal">
                <img src="${deal.Image}" alt="${deal.Title}" width="150">
                <h3>${deal.Title}</h3>
                <p>Price: $${deal.Price}</p>
                <p>⭐ Rating: ${deal.Rating}</p>
                <a href="${deal.AffiliateLinks}" target="_blank">Shop Now</a>
            </div>
        `;
    });

    document.getElementById("trending-deals").innerHTML = dealsHTML;
}

// Call the function to load deals when the page loads
fetchDeals();

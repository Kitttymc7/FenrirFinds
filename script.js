import { auth, db, signUpUser, logInUser, logOutUser, addPoints, redeemPoints } from "./index.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Sign Up Function (Connected to Frontend)
async function signUp() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    await signUpUser(email, password);
}

// Log In Function (Connected to Frontend)
async function logIn() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    await logInUser(email, password);
}

// Log Out Function
async function logOut() {
    await logOutUser();
    document.getElementById("user-info").innerText = "Not logged in";
}

// Fetch User Info & Points
async function fetchUserData(user) {
    if (user) {
        document.getElementById("user-info").innerText = `Logged in as: ${user.email}`;
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            document.getElementById("points").innerText = userDoc.data().points || 0;
        }
    }
}

// Earn & Redeem Points
async function earnPoints() { fetchUserData(auth.currentUser); await addPoints(auth.currentUser.uid, 10); }
async function redeemPoints() { fetchUserData(auth.currentUser); await redeemPoints(auth.currentUser.uid, 10); }

// Monitor Auth Changes
onAuthStateChanged(auth, (user) => { user ? fetchUserData(user) : logOut(); });

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import image1 from "../assets/images/registration/image1.png";

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    // Function to handle user signup
    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: user.email,
                role: "user"
            });

            console.log("Signup successful!");
            navigate("/usedcar");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please log in.");
            } else if (error.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Signup failed. Please try again.");
            }
            console.error("Signup error:", error.message);
        }
    };

    // Function to handle user login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if user exists in Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                setError("Account not found in our records. Please sign up.");
                await auth.signOut(); // Log out the user if they are not in Firestore
                return;
            }

            const role = userDoc.data().role;
            localStorage.setItem("role", role);
            console.log("Logged in as:", role);
            navigate(role === "admin" ? "/admin" : "/usedcar");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError("No account found with this email. Please sign up.");
            } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password. Please try again.");
            } else {
                setError("Login failed. Please check your details and try again.");
            }
            console.error("Login error:", error.message);
        }
    };

    // Google Login Function
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
    
            // Check if the user exists in Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                setError("Account not found. Please sign up first.");
                await auth.signOut(); // Log out the user immediately
                return;
            }
    
            // Proceed with login if user exists
            else{
            const role = userDoc.data().role;
            localStorage.setItem("role", role);
            navigate(role === "admin" ? "/admin" : "/usedcar");}
        } catch (error) {
            setError("Google sign-in failed. Please try again.");
            console.error("Google login error:", error.message);
        }
    };
    
    

    return (
        <div className="registration-container">
            <div className="loginsignup-container">
                <div className="loginsignup-right" style={{ backgroundImage: `url(${image1})` }}></div>
                <div className="loginsignup-left">
                    <div className="loginsignup-left-top">
                        <h1>Car<span>space</span></h1>
                        <div className="button-group">
                            <button onClick={() => setIsSignup(false)} className={!isSignup ? "active" : ""}>
                                Log In
                            </button>
                            <button onClick={() => setIsSignup(true)} className={isSignup ? "active" : ""}>
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {isSignup ? (
                        <form onSubmit={handleSignup}>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" required />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email ID" required />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
                            <button type="submit" className="continuebtn">Continue</button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin}>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
                            <button type="submit" className="continuebtn">Continue</button>
                            <button type="button" onClick={handleGoogleLogin} className="continuebtn">Continue with Google</button>
                        </form>
                    )}

                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Registration;
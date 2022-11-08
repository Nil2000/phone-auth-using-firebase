import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

//firebase imports
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect, useState } from "react";

function App() {
    const [viewOtpForm, setViewOtpForm] = useState(false);
    const [user, setUser] = useState([]);

    const firebaseConfig = {
        apiKey: "AIzaSyA1_c9_WfdXuqX4_EFtd-AzuaEG9k_xHgY",
        authDomain: "phone-auth-3a26c.firebaseapp.com",
        projectId: "phone-auth-3a26c",
        storageBucket: "phone-auth-3a26c.appspot.com",
        messagingSenderId: "144748080932",
        appId: "1:144748080932:web:3a7ab28b36888420578db1",
        measurementId: "G-M4K59X36CY",
    };

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: function (response) {
                    console.log("Captcha Resolved");
                    this.onSignInSubmit();
                },
                defaultCountry: "IN",
            }
        );
    }, []);

    // Use this to initialize the firebase App
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
    // const firebaseApp = firebase.initializeApp(firebaseConfig);

    // Use these for auth
    const auth = firebase.auth();

    //check if user available or not
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        }
    });

    const loginSubmit = (e) => {
        e.preventDefault();

        let phone_number = e.target.phone.value;
        const appVerifier = window.recaptchaVerifier;

        auth.signInWithPhoneNumber(phone_number, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                console.log("otp sent");
                setViewOtpForm(true);
                window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
                // Error; SMS not sent
                alert(error.message);
            });
    };

    //otp verify
    const otpSubmit = (e) => {
        e.preventDefault();

        let opt_number = e.target.otp_value.value;

        window.confirmationResult
            .confirm(opt_number)
            .then((confirmationResult) => {
                console.log(confirmationResult);
                console.log("success");
                window.open("/signin", "_self");
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                alert(error.message);
            });
    };

    const signOut = () => {
        auth
            .signOut()
            .then(() => {
                window.open("/", "_self");
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    };

    return (
        <Router>
            <div id="recaptcha-container"></div>
            <Routes>
                <Route exact path="/signin" element={<Home signOut={signOut} user={user}/>}></Route>
                <Route
                    exact
                    path="/"
                    element={
                        <SignIn
                            loginSubmit={loginSubmit}
                            otpSubmit={otpSubmit}
                            viewOtpForm={viewOtpForm}
                        />
                    }
                ></Route>
            </Routes>
        </Router>
    );
}

export default App;

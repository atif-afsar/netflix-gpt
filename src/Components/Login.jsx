import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AVATAR, BGIMAGE } from "../utils/Constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState(null);
  const [shake, setShake] = useState(false);

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  // Reset input values on mount
  useEffect(() => {
    if (fullName.current) fullName.current.value = "";
    if (email.current) email.current.value = "";
    if (password.current) password.current.value = "";
  }, []);

  const friendlyErrorMessages = {
    "auth/email-already-in-use": "Email is already registered.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/wrong-password": "Incorrect password.",
    "auth/user-not-found": "No user found with this email.",
    "auth/weak-password": "Password should be at least 6 characters.",
  };

  const handleButtonClick = () => {
    const fullNameValue = fullName.current ? fullName.current.value.trim() : "";
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();

    const message = checkValidation(
      emailValue,
      passwordValue,
      isSignIn ? "" : fullNameValue
    );

    if (message) {
      setError(message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (isSignIn) {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
          navigate("/browse");
        })
        .catch((error) => {
          const friendlyMessage =
            friendlyErrorMessages[error.code] || error.message;
          setError(friendlyMessage);
          setShake(true);
          setTimeout(() => setShake(false), 500);
        });
    } else {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullNameValue,
            photoURL: AVATAR,
          })
            .then(() => {
              navigate("/browse");
            })
            .catch((error) => {
              setError(error.message);
            });
        })
        .catch((error) => {
          const friendlyMessage =
            friendlyErrorMessages[error.code] || error.message;
          setError(friendlyMessage);
          setShake(true);
          setTimeout(() => setShake(false), 500);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
    setError("");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={BGIMAGE}
        alt="bg-image"
        className="h-full w-full object-cover"
      />

      {/* Enhanced Black Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0"></div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

      {/* Centered Form */}
      <form
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-gray-800/50 flex flex-col gap-4 sm:gap-6 z-10 text-white transition-all duration-300 shadow-2xl ${
          shake ? "animate-shake" : ""
        }`}
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            {isSignIn ? "Welcome Back" : "Join Netflix"}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            {isSignIn ? "Sign in to continue watching" : "Create your account to get started"}
          </p>
        </div>

        {!isSignIn && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <input
              ref={fullName}
              type="text"
              autoComplete="off"
              placeholder="Enter your full name"
              className="w-full p-3 sm:p-4 rounded-lg bg-gray-800/80 border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email Address</label>
          <input
            ref={email}
            type="email"
            autoComplete="off"
            placeholder="Enter your email"
            className={`w-full p-3 sm:p-4 rounded-lg bg-gray-800/80 border focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-gray-400 ${
              error?.toLowerCase().includes("email")
                ? "border-red-500 focus:ring-red-500/20"
                : "border-gray-700 focus:border-red-500 focus:ring-red-500/20"
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Password</label>
          <input
            ref={password}
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            className={`w-full p-3 sm:p-4 rounded-lg bg-gray-800/80 border focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-gray-400 ${
              error?.toLowerCase().includes("password")
                ? "border-red-500 focus:ring-red-500/20"
                : "border-gray-700 focus:border-red-500 focus:ring-red-500/20"
            }`}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleButtonClick}
          type="submit"
          className="w-full p-3 sm:p-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <div className="text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            {isSignIn ? "New to Netflix?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleSignInForm}
              className="ml-2 text-red-500 hover:text-red-400 font-semibold transition-colors duration-200"
            >
              {isSignIn ? "Sign up now" : "Sign in"}
            </button>
          </p>
        </div>

        <div className="text-center pt-4 border-t border-gray-800">
          <p className="text-gray-500 text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

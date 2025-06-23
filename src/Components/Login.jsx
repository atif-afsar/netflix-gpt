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
            photoURL:
              AVATAR,
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
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src={BGIMAGE}
        alt="bg-image"
        className="h-full w-full object-cover"
      />

      {/* Black Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

      {/* Centered Form */}
      <form
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 p-6 sm:p-8 md:p-12 rounded-md w-[90%] sm:w-[400px] flex flex-col gap-4 z-10 text-white transition-all duration-300 ${
          shake ? "animate-shake" : ""
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            ref={fullName}
            type="text"
            autoComplete="off"
            placeholder="Full Name"
            className="p-3 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )}

        <input
          ref={email}
          type="text"
          autoComplete="off"
          placeholder="Email Id"
          className={`p-3 rounded bg-neutral-800 focus:outline-none focus:ring-2 ${
            error?.toLowerCase().includes("email")
              ? "border border-red-500 focus:ring-red-500"
              : "focus:ring-red-600"
          }`}
        />

        <input
          ref={password}
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          className={`p-3 rounded bg-neutral-800 focus:outline-none focus:ring-2 ${
            error?.toLowerCase().includes("password")
              ? "border border-red-500 focus:ring-red-500"
              : "focus:ring-red-600"
          }`}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleButtonClick}
          type="submit"
          className="p-3 bg-red-600 hover:bg-red-700 rounded font-semibold"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <div className="text-sm text-gray-400 mt-2 sm:mt-4 text-center sm:text-left">
          <button
            onClick={toggleSignInForm}
            type="button"
            className="text-white hover:underline cursor-pointer"
          >
            {isSignIn
              ? "New to Netflix? Sign up now."
              : "Already have an account? Sign in."}
          </button>
        </div>

        <div className="text-xs text-gray-500 mt-2 sm:mt-4 text-center">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <button type="button" className="text-blue-500 hover:underline">
            Learn more.
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

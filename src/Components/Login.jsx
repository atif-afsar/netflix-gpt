import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState(null);
  const [shake, setShake] = useState(false);

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const fullNameValue = fullName.current ? fullName.current.value : "";
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();

    const message = checkValidation(emailValue, passwordValue, isSignIn ? "" : fullNameValue);

    if (message) {
      setError(message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setError("");
      console.log("Validation passed. Proceed with login...");
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
        src="https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/IN-en-20250512-TRIFECTA-perspective_688b8c03-78cb-46a6-ac1c-1035536f871a_small.jpg"
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
        onSubmit={(e) => e.preventDefault()}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 p-6 sm:p-8 md:p-12 rounded-md w-[90%] sm:w-[400px] flex flex-col gap-4 z-10 text-white transition-all duration-300 ${shake ? "animate-shake" : ""}`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
          ref={fullName}
            type="text"
            placeholder="Full Name"
            className="p-3 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )}

        <input
          ref={email}
          type="text"
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

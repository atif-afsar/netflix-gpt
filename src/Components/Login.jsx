import { useState } from "react";
import Header from "./Header";

const Login = () => {

  
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignInForm = () => {
      setIsSignIn(!isSignIn);
  }
  
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 p-12 rounded-md w-[400px] flex flex-col gap-4 z-10 text-white"
      >
        <h1 className="text-3xl font-bold">{isSignIn ? "Sign In" : "Sign Up"}</h1>

        
        {!isSignIn && <input
          type="text"
          placeholder="Full Name"
          className="p-3 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600"
        />}
        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-3 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

         

        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          type="submit"
          className="p-3 bg-red-600 hover:bg-red-700 rounded font-semibold"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <div className="text-center text-gray-400">OR</div>

        <button
          type="button"
          className="p-3 bg-neutral-600 hover:bg-neutral-700 rounded font-semibold"
        >
          Use a sign-in code
        </button>

        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="button" className="hover:underline text-gray-400">
            Forgot password?
          </button>
        </div>

        <div className="text-sm text-gray-400 mt-4">
         
          <button 
           onClick={toggleSignInForm}

          type="button" className="text-white hover:underline  cursor-pointer">
          {isSignIn ? " New to Netflix?  Sign up now."  : "Already have an account? Sign in."}
          </button>
        </div>

        <div className="text-xs text-gray-500 mt-4">
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

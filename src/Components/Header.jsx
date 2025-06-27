import React, { useState, useEffect, useRef } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR, LOGO, SUPPORTED_LANGUAGES } from "../utils/Constants";
import { toggleGptSearch } from "../utils/gptSlice";
import LANGUAGES from "../utils/LanguageConstans";
import { changeLanguage } from "../utils/configSlice";
// import { clearUser } from "../utils/userSlice"; // if you handle logout in Redux

const Header = () => {
  const User = useSelector((store) => store.user.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        // dispatch(clearUser()); // optional: clear Redux user state
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
        alert("Sign-out failed. Check console.");
      });
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute top-0 left-0 w-full px-4 sm:px-8 py-3 bg-gradient-to-b from-black to-transparent flex justify-between items-center z-20">
      {/* Logo */}
      <img
        className="w-28 sm:w-44 object-contain cursor-pointer"
        src={LOGO}
        alt="Netflix Logo"
      />

      {User && (
        <div className="flex p-1">
          {showGptSearch && (
            <select
              className="px-3 py-1 rounded-xl border border-gray-800 bg-red-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-900"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((LANGUAGE) => (
                <option
                  className="bg-black"
                  key={LANGUAGE.identifier}
                  value={LANGUAGE.identifier}
                >
                  {LANGUAGE.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className="flex items-center gap-2 px-6 py-2 mx-4 text-sm sm:text-base font-semibold bg-red-700 hover:bg-red-800 text-white rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            {showGptSearch ? "🏠 Home" : "🤖 GPT Search"}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10  border border-gray-300 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <img
                src={User.photoURL || AVATAR}
                alt={`${User?.displayName || "User"} Profile`}
                className="object-cover w-full h-full"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-36 bg-white text-sm text-black rounded-md shadow-lg z-50 transition ease-out duration-200">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                  onMouseDown={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

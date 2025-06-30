import React, { useState, useEffect, useRef } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR, LOGO, SUPPORTED_LANGUAGES } from "../utils/Constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { Bot } from "lucide-react";

const Header = () => {
  const User = useSelector((store) => store.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
        alert("Sign-out failed. Check console.");
      });
  };

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
    // setMobileMenuOpen(false);
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-2 sm:py-3 flex justify-between items-center z-20 ${
        showGptSearch
          ? "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
      }`}
    >
      {/* Logo */}
      <img
        onClick={() => navigate("/browse")}
        className="w-30 sm:w-24 md:w-24 lg:w-28 xl:w-32 object-contain cursor-pointer transition-all duration-300 hover:scale-105"
        src={LOGO}
        alt="Netflix Logo"
      />

      {User && (
        <>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {showGptSearch && (
              <select
                onChange={handleLanguageChange}
                className="px-3 py-2 rounded-xl border border-gray-700 bg-gray-800/80 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
                {SUPPORTED_LANGUAGES.map((LANGUAGE) => (
                  <option
                    className="bg-gray-800"
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
              aria-label={showGptSearch ? "Go to Home" : "Open GPT Search"}
              className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-2 text-sm lg:text-base font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Bot className="w-4 h-4" />
              {showGptSearch ? "🏠 Home" : "🤖 GPT Search"}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Open profile menu"
                className="w-10 h-10 border-2 border-gray-300 rounded-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 hover:border-red-500"
              >
                <img
                  src={User.photoURL || AVATAR}
                  alt={`${User?.displayName || "User"} Profile`}
                  className="object-cover w-full h-full"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-gray-900/95 text-sm text-white rounded-lg shadow-2xl z-50 border border-gray-700">
                  <div className="p-3 border-b border-gray-700">
                    <p className="font-medium">{User?.displayName || "User"}</p>
                    <p className="text-gray-400 text-xs">{User?.email}</p>
                  </div>
                  <button
                    className="w-full px-4 py-3 text-left hover:bg-red-600 transition-colors duration-200 rounded-b-xl"
                    onMouseDown={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu - GPT Button + Avatar */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handleGptSearchClick}
              aria-label={showGptSearch ? "Go to Home" : "Open GPT Search"}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-all duration-300"
            >
              <Bot className="w-4 h-4" />
              {showGptSearch ? "🏠" : "🤖 GPT"}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Open profile menu"
                className="w-9 h-9 border-2 border-gray-300 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 hover:border-red-500"
              >
                <img
                  src={User.photoURL || AVATAR}
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-gray-900/95 text-sm text-white rounded-xl shadow-2xl z-50 border border-gray-700">
                  <div className="p-3 border-b border-gray-700">
                    <p className="font-medium">{User?.displayName || "User"}</p>
                    <p className="text-gray-400 text-xs">{User?.email}</p>
                  </div>
                  <button
                    className="w-full px-4 py-3 text-left hover:bg-red-600 transition-colors duration-200 rounded-b-xl"
                    onMouseDown={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;

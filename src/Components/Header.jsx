import React, { useState, useEffect, useRef } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AVATAR, LOGO } from "../utils/Constants";

const Header = () => {
  const User = useSelector((store) => store.user.currentUser);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
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

  return (
    <div className="absolute top-0 left-0 w-full px-4 sm:px-8 py-3 bg-gradient-to-b from-black to-transparent flex justify-between items-center z-20">
      {/* Logo */}
      <img
        className="w-28 sm:w-44 object-contain cursor-pointer"
        src={LOGO}
        alt="Netflix Logo"
      />

      {/* Hamburger Menu (for future use) */}
      {/* <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-white focus:outline-none" aria-label="Toggle menu">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button> */}

      {/* Avatar Dropdown */}
      {User && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 border border-gray-300 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <img
              src={
                User.photoURL 
                ||
                {AVATAR}
              }
              alt={`${User?.displayName || "User"} Profile`}
              className="object-cover w-full h-full"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-36 bg-white text-sm text-black rounded-md shadow-lg z-30 transition ease-out duration-200">
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

import React from "react";
import { Bot } from "lucide-react";
import LANGUAGES from "../utils/LanguageConstans";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.LANGUAGES);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle search logic here
  };

  return (
    <div className="bg-transparent flex mt-16 items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 border border-red-700 backdrop-blur-md bg-opacity-90">
        <h2 className="text-white text-2xl font-bold mb-6 text-center tracking-wide">
          {LANGUAGES[langKey]?.heading || "🎬 Ask GPT"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex items-center border border-red-600 rounded-lg overflow-hidden shadow-inner transition-all duration-200"
        >
          <div className="pl-4 text-red-500">
            <Bot />
          </div>
          <input
            type="text"
            aria-label="GPT search input"
           placeholder={LANGUAGES[langKey]?.placeholder || "Type something..."}
            className="px-4 py-3 w-full text-white bg-transparent placeholder-gray-400 outline-none"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 hover:bg-red-700 transition-all duration-200 font-semibold"
          >
            {LANGUAGES[langKey]?.button || "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;

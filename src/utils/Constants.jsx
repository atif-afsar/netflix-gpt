export const LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const BGIMAGE = "https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/IN-en-20250512-TRIFECTA-perspective_688b8c03-78cb-46a6-ac1c-1035536f871a_small.jpg"

export const AVATAR = "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"

export const OMDB_API_KEY = import.meta.env.VITE_OMDB_KEY;

export const OMDB_BASE_URL = "https://www.omdbapi.com/";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  {identifier: "hi", name: "Hindi" },
  {identifier: "zh", name: "Chinese" }
];

// OpenAI Pro API Key for GPT movie recommendations
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
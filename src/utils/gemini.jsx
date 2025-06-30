import { OPENAI_API_KEY } from "./Constants";

// Local fallback: Generate movie recommendations without API
const generateLocalRecommendations = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Movie recommendation database
  const movieDatabase = {
    "funny": ["The Hangover", "Superbad", "Bridesmaids", "Shaun of the Dead", "The Grand Budapest Hotel", "Deadpool", "The Big Lebowski", "Groundhog Day", "Office Space", "Napoleon Dynamite", "Super Troopers", "This Is Spinal Tap"],
    "indian": ["3 Idiots", "PK", "Munna Bhai MBBS", "Andaz Apna Apna", "Hera Pheri", "Lagaan", "Dilwale Dulhania Le Jayenge", "Sholay", "Mother India", "Pather Panchali", "Gangs of Wasseypur", "Rang De Basanti"],
    "action": ["Mad Max: Fury Road", "John Wick", "Mission: Impossible", "The Dark Knight", "Inception", "Die Hard", "The Matrix", "Terminator 2", "Raiders of the Lost Ark", "Gladiator", "The Bourne Identity", "Speed"],
    "sci-fi": ["Interstellar", "Blade Runner 2049", "Arrival", "Ex Machina", "The Martian", "Gravity", "Her", "Looper", "District 9", "Moon", "Children of Men", "Minority Report"],
    "horror": ["Get Out", "A Quiet Place", "Hereditary", "The Conjuring", "It Follows", "The Babadook", "The Witch", "Hush", "The Descent", "28 Days Later", "The Ring", "Saw"],
    "romance": ["La La Land", "The Notebook", "500 Days of Summer", "Eternal Sunshine", "Before Sunrise", "Titanic", "Casablanca", "Roman Holiday", "When Harry Met Sally", "Pride and Prejudice", "The Princess Bride", "About Time"],
    "comedy": ["The Big Lebowski", "Groundhog Day", "Office Space", "Napoleon Dynamite", "Super Troopers", "This Is Spinal Tap", "Monty Python and the Holy Grail", "The Princess Bride", "Shaun of the Dead", "Hot Fuzz", "The Grand Budapest Hotel", "What We Do in the Shadows"],
    "drama": ["The Shawshank Redemption", "Forrest Gump", "The Green Mile", "Good Will Hunting", "A Beautiful Mind", "The Godfather", "Pulp Fiction", "Fight Club", "The Silence of the Lambs", "Schindler's List", "12 Angry Men", "One Flew Over the Cuckoo's Nest"],
    "thriller": ["Gone Girl", "The Silence of the Lambs", "Se7en", "Fight Club", "Memento", "The Usual Suspects", "Shutter Island", "Inception", "The Prestige", "Zodiac", "Prisoners", "Nightcrawler"],
    "animation": ["Spirited Away", "Toy Story", "Up", "Inside Out", "Coco", "The Lion King", "Spider-Man: Into the Spider-Verse", "Wall-E", "Finding Nemo", "Monsters Inc", "Ratatouille", "The Incredibles"]
  };

  // Find matching categories
  const matchingCategories = Object.keys(movieDatabase).filter(category => 
    lowerQuery.includes(category)
  );

  if (matchingCategories.length > 0) {
    // Return movies from the first matching category
    return movieDatabase[matchingCategories[0]].join(", ");
  }

  // Default recommendations for unknown queries
  return "The Shawshank Redemption, The Godfather, Pulp Fiction, Forrest Gump, Inception, The Dark Knight, Goodfellas, Schindler's List, 12 Angry Men, The Lord of the Rings, Fight Club, The Matrix";
};

export const fetchOpenAIResponse = async (prompt) => {
  try {
    // Try the Pro API endpoint first
    const response = await fetch(
      "https://api.proxyapi.us/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 100,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("🤖 OpenAI Response:", data);

    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content.trim();
    } else if (data?.error) {
      return `❌ Error: ${data.error.message}`;
    } else {
      return "❌ Unknown error from OpenAI.";
    }
  } catch (err) {
    console.error("❌ Pro API failed, trying alternative endpoint:", err);
    
    // Fallback: Try alternative Pro API endpoint
    try {
      const fallbackResponse = await fetch(
        "https://api.proxyapi.us/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 100,
            temperature: 0.7,
          }),
        }
      );

      if (!fallbackResponse.ok) {
        throw new Error(`Fallback HTTP error! status: ${fallbackResponse.status}`);
      }

      const fallbackData = await fallbackResponse.json();
      console.log("🤖 Fallback OpenAI Response:", fallbackData);

      if (fallbackData?.choices?.[0]?.message?.content) {
        return fallbackData.choices[0].message.content.trim();
      } else if (fallbackData?.error) {
        return `❌ Error: ${fallbackData.error.message}`;
      }
    } catch (fallbackErr) {
      console.error("❌ Fallback also failed:", fallbackErr);
    }
    
    // Final fallback: Use local recommendations
    console.log("🔄 Using local fallback recommendations");
    const userQuery = prompt.toLowerCase();
    const localRecommendations = generateLocalRecommendations(userQuery);
    return localRecommendations;
  }
};

// Keep the old function name for compatibility
export const fetchGeminiResponse = fetchOpenAIResponse;

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";

// Resolve __dirname properly for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set .env path
const envPath = path.join(__dirname, "../.env");

// Check if .env exists
if (!fs.existsSync(envPath)) {
  console.error(`❌ .env file is missing! Expected at: ${envPath}`);
  process.exit(1);
}

// Load .env
dotenv.config({ path: envPath });

// Debugging Logs
console.log(`✅ Loading .env from: ${envPath}`);
console.log("🔑 GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Loaded" : "Missing!");
console.log("🔑 SEARCHAPI_KEY:", process.env.SEARCHAPI_KEY ? "Loaded" : "Missing!");
console.log("🔗 MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing!");



// Import database models
import { BaseRecipe, RecipeVariation, User, UserPreferences, UserRecipe } from "../database/models.js";

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Make sure it's set in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

  mongoose.connection.once("open", async () => {
    console.log("✅ Connected to MongoDB");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📂 Available Collections:", collections.map((c) => c.name));
  });
  
/* --------------------- API ROUTES --------------------- */

// ✅ **1. Generate a Recipe using Gemini API**
app.post("/api/generate-recipe", async (req, res) => {
  const { ingredients, dietaryPreferences } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ message: "Ingredients are required." });
  }

  const prompt = `
    Create a detailed recipe using the following ingredients: ${ingredients.join(", ")}.
    Dietary preferences: ${dietaryPreferences || "None"}.
    Format the response in JSON with keys: "name", "ingredients", "steps", "nutrition".
  `;

  try {
    console.log("🚀 Sending request to Gemini API...");
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent", // Updated to supported model
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("✅ Gemini API Response:", response.data);

    // Extract generated text from response
    const rawResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawResponse) {
      return res.status(500).json({ message: "Error: No content returned from Gemini API." });
    }

    // Parse AI response
    let recipe;
    try {
      recipe = JSON.parse(rawResponse.replace(/```json|```/g, "").trim()); // Fix JSON formatting issues
    } catch (parseError) {
      console.error("❌ Error parsing AI response:", parseError);
      return res.status(500).json({ message: "Error parsing AI response.", rawResponse });
    }

    res.json({ recipe });
  } catch (error) {
    console.error("❌ Error generating recipe:", error);
    res.status(500).json({ message: "Error generating recipe", error: error.response?.data || error });
  }
});

// ✅ **2. Save Recipe to MongoDB**
app.post("/api/save-recipe", async (req, res) => {
  try {
    const newRecipe = new BaseRecipe(req.body);
    await newRecipe.save();
    res.status(201).json({ message: "Recipe saved successfully", recipe: newRecipe });
  } catch (error) {
    console.error("❌ Error saving recipe:", error);
    res.status(400).json({ message: "Error saving recipe", error });
  }
});

// ✅ **3. Search Recipes using SearchAPI.io**
app.get("/api/search-recipes", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Please provide a search query." });
  }

  try {
    const response = await axios.get("https://www.searchapi.io/api/v1/search", {
      params: {
        engine: "google",
        q: `${query} recipe`,
        api_key: process.env.SEARCHAPI_KEY,
      },
    });

    res.json({ results: response.data });
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
    res.status(500).json({ message: "Error fetching search results", error });
  }
});

// ✅ **4. Get All Recipes**
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await BaseRecipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
});

// ✅ **5. Get a Single Recipe by ID**
app.get("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await BaseRecipe.findOne({ _id: req.params.id });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
});

// ✅ **6. Delete a Recipe**
app.delete("/api/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await BaseRecipe.findOneAndDelete({ _id: req.params.id });
    if (!deletedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
});
// ✅ Search Recipes by Ingredient
app.get("/api/search", async (req, res) => {
  try {
    const { ingredient } = req.query;
    
    if (!ingredient) {
      return res.status(400).json({ message: "Please provide an ingredient." });
    }

    const recipes = await BaseRecipe.find({
      ingredients: { $regex: ingredient, $options: "i" } // Case-insensitive search
    });

    res.json(recipes);
  } catch (error) {
    console.error("❌ Error searching recipes:", error);
    res.status(500).json({ message: "Error searching recipes", error });
  }
});


// ✅ **7. Modify AI-Generated Recipe**
app.put("/api/recipes/:id/modify", async (req, res) => {
  try {
    const { modifications } = req.body;
    const existingRecipe = await BaseRecipe.findOne({ _id: req.params.id });

    if (!existingRecipe) return res.status(404).json({ message: "Recipe not found" });

    const prompt = `
      Modify this recipe based on the following changes: ${modifications}.
      Original Recipe: ${JSON.stringify(existingRecipe)}
    `;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent",
      { contents: [{ role: "user", parts: [{ text: prompt }] }] },
      { params: { key: process.env.GEMINI_API_KEY }, headers: { "Content-Type": "application/json" } }
    );

    const modifiedRecipe = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!modifiedRecipe) {
      return res.status(500).json({ message: "Error modifying recipe" });
    }

    res.json({ message: "Recipe modified", modifiedRecipe: JSON.parse(modifiedRecipe.replace(/```json|```/g, "").trim()) });
  } catch (error) {
    res.status(500).json({ message: "Error modifying recipe", error });
  }
});

// ✅ Default Route to Check if Server is Running
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// Start the Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

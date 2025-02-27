import mongoose from "mongoose";

// Define Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  steps: [String],
  nutrition: Object,
}, { collection: "baserecipes" }); // 👈 Explicitly setting collection name

const BaseRecipe = mongoose.model("BaseRecipe", recipeSchema);

// Define Recipe Variation Schema
const recipeVariationSchema = new mongoose.Schema({
  baseRecipeId: mongoose.Schema.Types.ObjectId,
  modifiedIngredients: [String],
  modifiedSteps: [String],
}, { collection: "recipevariations" });

const RecipeVariation = mongoose.model("RecipeVariation", recipeVariationSchema);
// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
}, { collection: "users" });

const User = mongoose.model("User", userSchema);

// Define User Preferences Schema
const userPreferencesSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  dietaryRestrictions: [String],
  allergies: [String],
  preferredCuisines: [String],
}, { collection: "userpreferences" });

const UserPreferences = mongoose.model("UserPreferences", userPreferencesSchema);

// Define User Recipe Interaction Schema
const userRecipeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  recipeId: mongoose.Schema.Types.ObjectId,
  saved: Boolean,
  rating: Number,
  review: String,
}, { collection: "userrecipes" });

const UserRecipe = mongoose.model("UserRecipe", userRecipeSchema);

// Export Models
export { BaseRecipe, RecipeVariation, User, UserPreferences, UserRecipe };

const mongoose = require("mongoose");
const { BaseRecipe, RecipeVariation, User, UserPreferences, UserRecipe } = require("./models"); // Import models

const MONGO_URI = "mongodb+srv://recipe_genAI:aakanshakumkum@cluster0.sm5et.mongodb.net/";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


  const seedDatabase = async () => {
    try {
      // Clear previous data
      await BaseRecipe.deleteMany();
      await RecipeVariation.deleteMany();
      await User.deleteMany();
      await UserPreferences.deleteMany();
      await UserRecipe.deleteMany();
  
      // Create a sample user
      const user = new User({
        user_id: "user_001",
        username: "john_doe",
        email: "john@example.com",
        password_hash: "hashedpassword123",
      });
  
      await user.save();
  
      // Create a sample base recipe
      const baseRecipe = new BaseRecipe({
        recipe_id: "recipe_001",
        name: "Classic Chocolate Chip Cookies",
        ingredients: [
          { name: "Flour", quantity: "2 cups" },
          { name: "Sugar", quantity: "1 cup" },
          { name: "Chocolate Chips", quantity: "1 cup" },
        ],
        steps: ["Preheat oven to 350°F", "Mix ingredients", "Bake for 12 minutes"],
        cuisine_type: "American",
        prep_time: 10,
        cook_time: 12,
        difficulty_level: "Easy",
        tags: ["Dessert", "Baking"],
      });
  
      await baseRecipe.save();
  
      // Create a sample variation
      const recipeVariation = new RecipeVariation({
        variation_id: "var_001",
        recipe_id: "recipe_001",
        name: "Vegan Chocolate Chip Cookies",
        variation_type: "Vegan",
        modified_ingredients: [{ name: "Flax Egg", quantity: "1" }],
        modified_steps: ["Use flax egg instead of regular egg"],
        dietary_info: ["Vegan"],
        ai_generated: true,
      });
  
      await recipeVariation.save();
  
      console.log("✅ Database seeded successfully!");
    } catch (error) {
      console.error("❌ Seeding error:", error);
    } finally {
      mongoose.connection.close();
    }
  };
  
  // Run seeding function
  seedDatabase();
  
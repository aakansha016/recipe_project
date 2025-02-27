import React, { useState } from 'react';

const RecipeCreator: React.FC = () => {
  const [recipeInput, setRecipeInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeInput(e.target.value);
  };

  const handleGenerate = () => {
    // Future implementation for recipe generation
    console.log("Generating recipe with input:", recipeInput);
    alert("Recipe generation will be implemented in the next phase!");
  };

  return (
    <div className="recipe-creator">
      <h1 className="headline">Your AI Sous-Chef, Always Ready to Serve:</h1>
      <p className="subheadline">
        Simply input the ingredients in your kitchen or share your recipe idea, and 
        ByteBite's intelligent AI will instantly craft a personalized, creative recipe 
        tailored to your needs. From pantry to plate, delicious meals are just a few 
        clicks away.
      </p>
      
      <div className="recipe-input-container">
        <input 
          type="text" 
          value={recipeInput}
          onChange={handleInputChange}
          className="recipe-input" 
          placeholder="Create a recipe for/with" 
        />
      </div>
      
      <button onClick={handleGenerate} className="generate-button">
        Generate
      </button>
      
      <style jsx>{`
        .recipe-creator {
          background-color: #f0b2b9;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .headline {
          color: #be0822;
          font-size: 40px;
          margin-bottom: 20px;
          max-width: 800px;
        }
        
        .subheadline {
          color: #ea7580;
          font-size: 18px;
          margin-bottom: 40px;
          max-width: 900px;
          line-height: 1.6;
        }
        
        .recipe-input-container {
          width: 100%;
          max-width: 600px;
          margin-bottom: 20px;
        }
        
        .recipe-input {
          width: 100%;
          padding: 15px 20px;
          font-size: 18px;
          border: none;
          border-radius: 5px;
          background-color: #fcd7d0;
          color: #A5B192;
          text-align: center;
        }
        
        .generate-button {
          background-color: #fcd7d0;
          color: #A5B192;
          padding: 12px 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default RecipeCreator;
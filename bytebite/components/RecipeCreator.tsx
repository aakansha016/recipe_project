import React, { useState } from 'react';

const RecipeCreator: React.FC = () => {
  const [recipeInput, setRecipeInput] = useState<string>('');

  return (
    <div className="recipe-creator">
      <h1 className="headline">Your AI Sous-Chef, Always Ready to Serve:</h1>
      <p className="subheadline">
        Simply input the ingredients in your kitchen or share your recipe idea, and 
        <span className="highlight"> ByteBite's</span> intelligent AI will instantly craft a personalized, creative recipe 
        tailored to your needs. From pantry to plate, delicious meals are just a few 
        clicks away.
      </p>
      
      <div className="input-container">
        <input 
          type="text" 
          value={recipeInput}
          onChange={(e) => setRecipeInput(e.target.value)}
          className="recipe-input" 
          placeholder="Create a recipe for/with" 
        />
      </div>

      <button className="generate-button">Generate</button>

      <style jsx>{`
        .recipe-creator {
          background-color: #f0b2b9;
          padding: 60px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .headline {
          color: #be0822;
          font-size: 40px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .subheadline {
          color: #ea7580;
          font-size: 18px;
          margin-bottom: 40px;
          max-width: 800px;
          line-height: 1.6;
        }

        .highlight {
          font-weight: bold;
          color: #be0822;
        }

        .input-container {
          width: 100%;
          max-width: 500px;
          margin-bottom: 20px;
        }

        .recipe-input {
          width: 100%;
          padding: 12px;
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
          border: none;
        }
      `}</style>
    </div>
  );
};

export default RecipeCreator;

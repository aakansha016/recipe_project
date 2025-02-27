"use client";
import { useState } from "react";

export default function RecipeInput() {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col items-center mt-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Create a recipe for/with..."
        className="w-96 p-3 border rounded-lg bg-buttonBg text-[#A5B192] text-center font-semibold"
      />
      <button className="mt-4 px-6 py-2 bg-buttonBg text-primary font-bold rounded-lg">
        Generate
      </button>
    </div>
  );
}

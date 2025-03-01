'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import RecipeCreator from '../components/RecipeCreator';

export default function Home() {
  return (
    <main>
      <Navbar />
      <RecipeCreator />
    </main>
  );
}

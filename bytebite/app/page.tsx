'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import RecipeCreator from '../components/RecipeCreator';

export default function Home() {
  return (
    <main>
      <Navbar isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <RecipeCreator />
    </main>
  );
}
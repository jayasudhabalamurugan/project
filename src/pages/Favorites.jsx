import React, { useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import RecipeDetail from "../components/RecipeDetail";

export default function Favorites(){
  const { recipes, favorites, toggleFavorite } = useRecipes();
  const favRecipes = recipes.filter(r => favorites.includes(r.id));
  const [sel, setSel] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Your Favorites</h2>
      {favRecipes.length === 0 && <div className="text-gray-500">No favorites yet.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {favRecipes.map(r => (
          <RecipeCard key={r.id} recipe={r} onOpen={setSel} onToggleFav={toggleFavorite} isFav={true} />
        ))}
      </div>

      {sel && <RecipeDetail recipe={sel} onClose={() => setSel(null)} />}
    </div>
  );
}

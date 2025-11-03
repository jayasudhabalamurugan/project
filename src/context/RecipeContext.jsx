// src/context/RecipeContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import sampleRecipes from "../data/sampleRecipes"; // optional: if you have sample file, else fallback below

const STORAGE_KEY = "recipefinder_recipes_v1";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  // load from localStorage or fallback to built-in sample
  const [recipes, setRecipes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    // fallback sample: if you already have sampleRecipes file, it'll be used
    const fallback = Array.isArray(sampleRecipes) && sampleRecipes.length
      ? sampleRecipes
      : [
          {
            id: "r1",
            title: "Masala Dosa",
            category: "veg",
            image: "/assets/dosa.jpg",
            cookTimeMins: 15,
            servings: 2,
            likes: [],
            shares: 0,
            ingredients: ["2 cups rice", "1/2 cup urad dal", "Salt", "Oil"],
            steps: ["Soak rice & dal 4-6 hrs", "Grind to batter", "Ferment", "Cook dosa"]
          },
          {
            id: "r2",
            title: "Chicken Biryani",
            category: "non-veg",
            image: "/assets/biryani.jpg",
            cookTimeMins: 60,
            servings: 4,
            likes: [],
            shares: 0,
            ingredients: ["Basmati rice", "Chicken", "Biryani masala", "Onion", "Yogurt"],
            steps: ["Marinate chicken", "Fry onions", "Layer rice & chicken", "Dum cook"]
          }
        ];
    return fallback;
  });

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch (e) {}
  }, [recipes]);

  // helpers
  function addRecipe(newRecipe) {
    setRecipes(prev => [{ ...newRecipe, id: `r${Date.now()}` }, ...(prev || [])]);
  }

  function toggleLike(recipeId, userId = "me") {
    setRecipes(prev => {
      if (!Array.isArray(prev)) return prev;
      return prev.map(r => {
        if (r.id !== recipeId) return r;
        const likes = Array.isArray(r.likes) ? [...r.likes] : [];
        const idx = likes.indexOf(userId);
        if (idx === -1) likes.push(userId);
        else likes.splice(idx, 1);
        return { ...r, likes };
      });
    });
  }

  function toggleSave(recipeId) {
    // we'll keep saved list in localStorage under key 'saved_recipes'
    try {
      const sRaw = localStorage.getItem("recipefinder_saved") || "[]";
      const saved = JSON.parse(sRaw);
      const i = saved.indexOf(recipeId);
      if (i === -1) saved.push(recipeId);
      else saved.splice(i, 1);
      localStorage.setItem("recipefinder_saved", JSON.stringify(saved));
      // no recipes change required for saved state, but we can trigger a set to force re-render
      setRecipes(prev => prev ? [...prev] : prev);
    } catch (e) {}
  }

  function isSaved(id) {
    try {
      const s = JSON.parse(localStorage.getItem("recipefinder_saved") || "[]");
      return Array.isArray(s) && s.includes(id);
    } catch (e) {
      return false;
    }
  }

  function incrementShare(id) {
    setRecipes(prev => {
      if (!Array.isArray(prev)) return prev;
      return prev.map(r => {
        if (r.id !== id) return r;
        const shares = typeof r.shares === "number" ? r.shares + 1 : 1;
        return { ...r, shares };
      });
    });
    // persist done by useEffect that watches recipes
  }

  const value = {
    recipes,
    setRecipes,
    addRecipe,
    toggleLike,
    toggleSave,
    isSaved,
    incrementShare
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export function useRecipes() {
  return useContext(RecipeContext);
}

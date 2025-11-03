import React, { useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

export default function Explore() {
  const { recipes } = useRecipes();
  const [q, setQ] = useState("");
  const [activeCardId, setActiveCardId] = useState(null);

  const query = q.trim().toLowerCase();
  const results = recipes.filter(r => {
    if (!query) return true;
    const inTitle = r.title?.toLowerCase().includes(query);
    const inIng = Array.isArray(r.ingredients) && r.ingredients.some(i => i.name?.toLowerCase().includes(query));
    return inTitle || inIng;
  });

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name or ingredient..."
        className="search-bar"
      />

      <div className={`recipe-grid ${activeCardId ? "dim" : ""}`}>
        {results.map(r => (
          <RecipeCard
            key={r.id}
            recipe={r}
            isActive={activeCardId === r.id}
            setActive={(val) => {
              // allow both function or value set
              if (typeof val === "function") {
                setActiveCardId(prev => {
                  const newVal = val(prev);
                  return newVal;
                });
              } else {
                setActiveCardId(prev => prev === val ? null : val);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import AddRecipeModal from "./components/AddRecipeModal";
import { useRecipes } from "./context/RecipeContext";

export default function App() {
  const { recipes, addRecipe, toggleLike, toggleSave, isSaved } = useRecipes();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all"); // all | veg | nonveg
  const [activeId, setActiveId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return recipes.filter(r => {
      if (filter === "veg" && r.category?.toLowerCase() !== "veg") return false;
      if (filter === "nonveg" && r.category?.toLowerCase() === "veg") return false;
      if (!s) return true;
      return (
        r.title?.toLowerCase().includes(s) ||
        (r.ingredients || []).join(" ").toLowerCase().includes(s)
      );
    });
  }, [recipes, q, filter]);

  return (
    <div className="app-root">
      <Header
        q={q}
        setQ={setQ}
        onOpenAdd={() => setShowAdd(true)}
        filter={filter}
        setFilter={setFilter}
      />

      <main className="container">
        <section className="recipes-grid">
          {filtered.map((r) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              isActive={activeId === r.id}
              setActive={setActiveId}
            />
          ))}
        </section>
      </main>

      {showAdd && (
        <AddRecipeModal
          onClose={() => setShowAdd(false)}
          onSave={(newRecipe) => {
            addRecipe(newRecipe);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}

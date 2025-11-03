// src/App.jsx
import React, { useMemo, useState } from "react";
import { useRecipes } from "./context/RecipeContext";
import RecipeCard from "./components/RecipeCard";
import AddRecipeModal from "./components/AddRecipeModal";
import "./App.css";

export default function App() {
  const { recipes } = useRecipes();

  // UI state
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState(null);
  const [selected, setSelected] = useState(null);

  // add-modal state
  const [showAdd, setShowAdd] = useState(false);
  function openAdd(){ setShowAdd(true); }
  function closeAdd(){ setShowAdd(false); }

  // helpers to build searchable text
  function textOf(r){
    if(!r) return "";
    const parts = [
      (r.title||"").toString(),
      (r.category||r.diet||"").toString(),
      Array.isArray(r.ingredients) ? r.ingredients.join(" ") : (r.ingredients||"").toString(),
      Array.isArray(r.steps) ? r.steps.join(" ") : (r.steps||"").toString()
    ];
    return parts.join(" ").toLowerCase();
  }
  function isVeg(r){
    const t = textOf(r);
    if(!t) return false;
    const bad = ["chicken","mutton","fish","egg","prawn","meat","shrimp"];
    for(const w of bad) if(t.includes(w)) return false;
    const vegWords = ["veg","vegetarian","paneer","tofu","vegetable","dal"];
    for(const w of vegWords) if(t.includes(w)) return true;
    return (r.category||"").toString().toLowerCase().includes("veg");
  }
  function isNonVeg(r){
    const t = textOf(r);
    if(!t) return false;
    const non = ["chicken","mutton","fish","egg","prawn","meat","shrimp"];
    for(const w of non) if(t.includes(w)) return true;
    const cat = (r.category||"").toString().toLowerCase();
    return cat.includes("non");
  }

  const filtered = useMemo(()=>{
    const qStr = (q||"").toString().trim().toLowerCase();
    const list = Array.isArray(recipes) ? recipes : [];
    let res = list.filter(r=>{
      if(!r) return false;
      if(!qStr) return true;
      return textOf(r).includes(qStr);
    });
    if(filter === "veg") res = res.filter(isVeg);
    else if(filter === "non-veg") res = res.filter(isNonVeg);
    else if(filter === "saved") {
      try {
        const saved = JSON.parse(localStorage.getItem("recipefinder_saved")||"[]");
        res = res.filter(r => saved.includes(r.id));
      } catch(e){}
    }
    return res;
  }, [recipes, q, filter]);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon">🍴</span>
          <span className="brand-title">RecipeFinder</span>
        </div>

        <input
          className="search-bar"
          placeholder="Search recipes, ingredients..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />

        <div style={{display:"flex", gap:10, alignItems:"center"}}>
          <button className="add-btn" onClick={openAdd}>+ Add Recipe</button>
        </div>
      </header>

      <nav className="tabs-row">
        <button className={`tab ${filter==="all"?"tab-active":""}`} onClick={()=>setFilter("all")}>All</button>
        <button className={`tab ${filter==="veg"?"tab-active":""}`} onClick={()=>setFilter("veg")}>Veg</button>
        <button className={`tab ${filter==="non-veg"?"tab-active":""}`} onClick={()=>setFilter("non-veg")}>Non-Veg</button>
        <button className={`tab ${filter==="saved"?"tab-active":""}`} onClick={()=>setFilter("saved")}>Saved</button>
      </nav>

      <main className="container">
        <section className="recipes-grid">
          {filtered && filtered.length ? filtered.map(r=>(
            <RecipeCard
              key={r.id}
              recipe={r}
              isActive={activeId === r.id}
              setActive={setActiveId}
              onOpen={(rec)=>setSelected(rec)}
            />
          )) : <div className="no-recipes">No recipes found</div>}
        </section>

        {selected && (
          <aside className="detail">
            <h2>{selected.title}</h2>
            <button onClick={()=>setSelected(null)}>Close</button>
          </aside>
        )}
      </main>

      {showAdd && <AddRecipeModal onClose={closeAdd} onSave={(r)=>{ /* optional */ }} />}
    </div>
  );
}

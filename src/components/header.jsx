// src/components/Header.jsx
import React from "react";

export default function Header({ q, setQ, onOpenAdd, filter, setFilter }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand left */}
        <div className="brand">🍴 RecipeFinder</div>

        {/* Search bar center */}
        <input
          className="search-bar"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search recipes, ingredients..."
          aria-label="Search"
        />

        {/* Add Recipe button right */}
        <button className="add-btn" onClick={onOpenAdd}>
          ➕ Add Recipe
        </button>
      </div>

      {/* Tabs row below header */}
      <nav className="tabs-row">
        <button
          className={`tab ${filter === "all" ? "tab-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`tab ${filter === "Veg" ? "tab-active" : ""}`}
          onClick={() => setFilter("Veg")}
        >
          Veg
        </button>
        <button
          className={`tab ${filter === "nonveg" ? "tab-active" : ""}`}
          onClick={() => setFilter("nonveg")}
        >
          Non-Veg
        </button>
            <button
          className={`tab ${filter === "Saved" ? "tab-active" : ""}`}
          onClick={() => setFilter("Saved")}
        >
          Saved
        </button>
      </nav>
    </header>
  );
}

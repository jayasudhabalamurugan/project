// src/components/RecipeDetail.jsx
import React from "react";

export default function RecipeDetail({ recipe, onClose }) {
  if (!recipe) return null;
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} />
        <p><strong>Cook Time:</strong> {recipe.cookTimeMins} mins • <strong>Serves:</strong> {recipe.servings}</p>

        <h4>Ingredients</h4>
        <ul>{(recipe.ingredients||[]).map((i, idx) => <li key={idx}>{i}</li>)}</ul>

        <h4>Steps</h4>
        <ol>{(recipe.steps||[]).map((s, idx) => <li key={idx}>{s}</li>)}</ol>
      </div>
    </div>
  );
}

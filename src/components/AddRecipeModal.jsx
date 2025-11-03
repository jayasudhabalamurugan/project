// src/components/AddRecipeModal.jsx
import React, { useState } from "react";
import { useRecipes } from "../context/RecipeContext";

export default function AddRecipeModal({ onClose, onSave }) {
  const { addRecipe } = useRecipes();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("veg");
  const [image, setImage] = useState("");
  const [cookTimeMins, setCookTimeMins] = useState("");
  const [servings, setServings] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) { alert("Please enter a title"); return; }

    const newRecipe = {
      id: `r${Date.now()}`,
      title: title.trim(),
      category,
      image: image.trim() || "/assets/placeholder.png",
      cookTimeMins: Number(cookTimeMins) || 0,
      servings: Number(servings) || 1,
      likes: [],
      shares: 0,
      ingredients: ingredientsText.split("\n").map(s => s.trim()).filter(Boolean),
      steps: stepsText.split("\n").map(s => s.trim()).filter(Boolean),
    };

    addRecipe(newRecipe);
    if (typeof onSave === "function") onSave(newRecipe);
    if (typeof onClose === "function") onClose();
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{marginTop:0}}>Add Recipe</h3>
        <form onSubmit={handleSubmit} style={{display:"grid", gap:10}}>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
          <input placeholder="Image path (optional)" value={image} onChange={e => setImage(e.target.value)} />
          <div style={{display:"flex", gap:8}}>
            <input type="number" placeholder="Cook minutes" value={cookTimeMins} onChange={e => setCookTimeMins(e.target.value)} />
            <input type="number" placeholder="Servings" value={servings} onChange={e => setServings(e.target.value)} />
          </div>
          <textarea placeholder="Ingredients (one per line)" rows={4} value={ingredientsText} onChange={e => setIngredientsText(e.target.value)} />
          <textarea placeholder="Steps (one per line)" rows={4} value={stepsText} onChange={e => setStepsText(e.target.value)} />
          <div style={{display:"flex", justifyContent:"flex-end", gap:8}}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};
const modalStyle = {
  width: 720,
  maxWidth: "96%",
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 10px 30px rgba(0,0,0,0.18)"
};

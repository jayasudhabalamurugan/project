import React, { useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

export default function AddRecipe(){
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [ingredientsText, setIngredientsText] = useState(""); // each line "qty|ingredient" or just "ingredient"
  const [stepsText, setStepsText] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [diet, setDiet] = useState("vegetarian");
  const [difficulty, setDifficulty] = useState("easy");

  function onImage(e){
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  function submit(e){
    e.preventDefault();
    if (!title.trim()) return alert("Please add title");
    const ingredients = ingredientsText.split("\n").map(line => {
      const s = line.split("|").map(x => x.trim());
      if (s.length === 2) return { qty: s[0], name: s[1] };
      return { name: line.trim() };
    }).filter(x => x.name);
    const steps = stepsText.split("\n").map(s => s.trim()).filter(Boolean);
    addRecipe({
      title: title.trim(),
      image,
      ingredients,
      steps,
      cookTimeMins: Number(cookTime) || 0,
      servings: Number(servings) || 1,
      diet,
      difficulty
    });
    navigate("/");
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-1 gap-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Recipe title" className="p-2 border rounded" />

        <label className="text-sm">Image (optional)</label>
        <input type="file" accept="image/*" onChange={onImage} />

        <textarea value={ingredientsText} onChange={e=>setIngredientsText(e.target.value)} placeholder="Ingredients (each line: qty|name OR name)" className="p-2 border rounded h-28" />

        <textarea value={stepsText} onChange={e=>setStepsText(e.target.value)} placeholder="Steps (each line one step)" className="p-2 border rounded h-28" />

        <div className="flex gap-2">
          <input value={cookTime} onChange={e=>setCookTime(e.target.value)} placeholder="Cook time (mins)" className="p-2 border rounded" />
          <input value={servings} onChange={e=>setServings(e.target.value)} placeholder="Servings" className="p-2 border rounded" />
        </div>

        <div className="flex gap-2">
          <select value={diet} onChange={e=>setDiet(e.target.value)} className="p-2 border rounded">
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="non-veg">Non-veg</option>
          </select>
          <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="p-2 border rounded">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Recipe</button>
        </div>
      </div>
    </form>
  );
}

// src/components/RecipeCard.jsx
import React, { useRef, useState, useEffect } from "react";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeCard({ recipe, isActive, setActive, onOpen }) {
  const { toggleLike, toggleSave, isSaved, incrementShare } = useRecipes();
  const userId = "me";
  const liked = Array.isArray(recipe.likes) && recipe.likes.includes(userId);
  const saved = isSaved(recipe.id);

  const [expanded, setExpanded] = useState(false);
  const [heartShow, setHeartShow] = useState(false);
  const dblTimer = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isActive) setExpanded(false);
  }, [isActive]);

  useEffect(() => {
    if (expanded && cardRef.current) {
      setTimeout(() => cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" }), 140);
    }
  }, [expanded]);

  function triggerHeart() {
    setHeartShow(true);
    setTimeout(() => setHeartShow(false), 700);
  }

  function handleImageClick(e) {
    e.stopPropagation();
    if (dblTimer.current) {
      clearTimeout(dblTimer.current);
      dblTimer.current = null;
      if (!liked) toggleLike(recipe.id, userId);
      triggerHeart();
      setExpanded(true);
      if (typeof onOpen === "function") onOpen(recipe);
    } else {
      dblTimer.current = setTimeout(() => {
        setExpanded(prev => !prev);
        setActive(prev => (prev === recipe.id ? null : recipe.id));
        clearTimeout(dblTimer.current);
        dblTimer.current = null;
      }, 220);
    }
  }

  function onLikeClick(e) {
    e.stopPropagation();
    toggleLike(recipe.id, userId);
    triggerHeart();
    setExpanded(true);
  }

  function onSaveClick(e) {
    e.stopPropagation();
    toggleSave(recipe.id);
    setExpanded(true);
  }

  async function onShareClick(e) {
    e.stopPropagation();

    // increment share count in context
    if (typeof incrementShare === "function") incrementShare(recipe.id);

    // try Web Share API
    const shareUrl = `${window.location.origin}${window.location.pathname}#recipe-${recipe.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe.title || "Recipe",
          text: recipe.title || "",
          url: shareUrl
        });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${recipe.title || ""} - ${shareUrl}`);
        // optionally show toast: alert("Link copied to clipboard");
      } else {
        // fallback
        // alert("Share not supported on this browser.");
      }
    } catch (err) {
      // user cancelled or error - ignore
    }

    setExpanded(true);
  }

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : (typeof recipe.ingredients === "string" ? recipe.ingredients.split("\n").map(s=>s.trim()).filter(Boolean) : []);
  const steps = Array.isArray(recipe.steps) ? recipe.steps : (typeof recipe.steps === "string" ? recipe.steps.split("\n").map(s=>s.trim()).filter(Boolean) : []);

  return (
    <article ref={cardRef} className={`recipe-card ${expanded ? "expanded" : ""}`} onClick={() => { setExpanded(p=>!p); setActive(p => (p === recipe.id ? null : recipe.id)); }}>
      <div className="img-wrap" onClick={handleImageClick}>
        <div className="recipe-img-container">
          <img src={recipe.image || "/assets/placeholder.png"} alt={recipe.title} className="recipe-img" />
        </div>
        <div className="title-overlay">
          <div className="title-left">
            <strong className="title-text">{recipe.title}</strong>
            <div className="meta">{recipe.cookTimeMins || 0} mins • {recipe.servings || 1} servings</div>
          </div>
        </div>

        <div className={`heart-overlay ${heartShow ? "show" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="80" height="80" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M12 21s-7.5-4.35-10-7.2C-1.6 9.9 3.6 4 7.7 6.4 9.6 7.6 12 10 12 10s2.4-2.4 4.3-3.6C20.4 4 26.6 9.9 22 13.8 19.5 16.65 12 21 12 21z"/>
          </svg>
        </div>
      </div>

      <div className="card-body">
        <div className="actions" onClick={(e)=>e.stopPropagation()}>
          <button className={`btn ${liked ? "btn-cta" : "btn-outline"}`} onClick={onLikeClick}>
            {liked ? `❤️ Liked (${recipe.likes?.length || 0})` : `♡ Like${recipe.likes?.length ? ` (${recipe.likes.length})` : ""}`}
          </button>

          <div style={{ flex: 1 }} />

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={onShareClick}>🔗 {recipe.shares && recipe.shares > 0 ? `(${recipe.shares})` : ""}</button>
            <button className={`btn ${saved ? "btn-cta" : "btn-outline"}`} onClick={onSaveClick}>
              {saved ? "♥ Saved" : "♡ Save"}
            </button>
          </div>
        </div>

        <div className={`expand-area ${expanded ? "open" : ""}`}>
          <div className="details-grid">
            <div>
              <h4>Ingredients</h4>
              <ul>{ingredients.map((ing,i)=><li key={i}>{ing}</li>)}</ul>
            </div>
            <div>
              <h4>Steps</h4>
              <ol>{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

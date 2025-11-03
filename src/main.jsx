import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RecipeProvider } from "./context/RecipeContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </React.StrictMode>
);

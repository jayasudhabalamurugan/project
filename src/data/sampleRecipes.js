// src/data/sampleRecipes.js

import masalaDosaImg from "../assets/masala-dosa.png";
import chickenBiryaniImg from "../assets/chicken-biryani.png";
import vegBiryaniImg from "../assets/veg-biryani.png";
import PaneerButterMasalaImg from "../assets/paneer-butter-masala.png";
import pulaoImg from "../assets/vegetable-pulao.png";
import lemonRiceImg from "../assets/lemon-rice.png";
import chicken65Img from "../assets/chicken-65.png";
import fishFryImg from "../assets/fish-fry.png";
import eggImg from "../assets/egg.png";

const now = new Date().toISOString();

const sampleRecipes = [
  {
    id: "r1",
    title: "Masala Dosa",
    image: masalaDosaImg,
    time: "35 mins",
    servings: "2 servings",
    category: "Veg",
    ingredients: ["2 cups rice", "1/2 cup urad dal", "Salt", "Oil"],
    steps: ["Soak rice & dal 4-6 hrs", "Grind to batter", "Ferment", "Cook dosa"],
    createdAt: now,
  },
  {
    id: "r2",
    title: "Chicken Biryani",
    image: chickenBiryaniImg,
    time: "75 mins",
    servings: "4 servings",
    category: "Non-Veg",
    ingredients: ["Basmati rice", "Chicken", "Biryani masala", "Onion", "Yogurt"],
    steps: ["Marinate chicken", "Fry onions", "Layer rice & chicken", "Dum cook"],
    createdAt: now,
  },
  {
    id: "r3",
    title: "Veg Biryani",
    image: vegBiryaniImg,
    time: "45 mins",
    servings: "3 servings",
    category: "Veg",
    ingredients: ["Basmati rice", "Mixed vegetables", "Spices", "Ghee"],
    steps: ["Saute spices", "Add veggies", "Add rice & water", "Cook until done"],
    createdAt: now,
  },
  {
    id: "r4",
    title: "Paneer Butter Masala",
    image: PaneerButterMasalaImg,
    time: "30 mins",
    servings: "3 servings",
    category: "Veg",
    ingredients: ["Paneer", "Tomato", "Butter", "Kasuri methi"],
    steps: ["Make tomato gravy", "Add paneer", "Simmer until thick"],
    createdAt: now,
  },
  {
    id: "r5",
    title: "Vegetable Pulao",
    image: pulaoImg,
    time: "30 mins",
    servings: "4 servings",
    category: "Veg",
    ingredients: ["Basmati rice", "Mixed veggies", "Ghee", "Spices"],
    steps: ["Saute spices", "Add rice & water", "Cook until done"],
    createdAt: now,
  },
  {
    id: "r6",
    title: "Lemon Rice (South Indian)",
    image: lemonRiceImg,
    time: "20 mins",
    servings: "3 servings",
    category: "Veg",
    ingredients: ["Cooked rice", "Lemon", "Mustard", "Chilies"],
    steps: ["Temper spices", "Mix with rice", "Add lemon juice"],
    createdAt: now,
  },
  {
    id: "r7",
    title: "Chicken 65",
    image: chicken65Img,
    time: "25 mins",
    servings: "2 servings",
    category: "Non-Veg",
    ingredients: ["Chicken", "Yogurt", "Red chili", "Spices"],
    steps: ["Marinate", "Shallow fry", "Toss with curry leaves"],
    createdAt: now,
  },
  {
    id: "r8",
    title: "Crispy Fish Fry",
    image: fishFryImg,
    time: "25 mins",
    servings: "2 servings",
    category: "Non-Veg",
    ingredients: ["Fish pieces", "Rice flour", "Spices"],
    steps: ["Marinate fish", "Coat and fry until crispy"],
    createdAt: now,
  },
  {
    id: "r9",
    title: "Egg Curry (South Style)",
    image: eggImg,
    time: "25 mins",
    servings: "3 servings",
    category: "Non-Veg",
    ingredients: ["Boiled eggs", "Onion-tomato masala", "Coconut"],
    steps: ["Prepare gravy", "Add eggs", "Simmer 5 min"],
    createdAt: now,
  },
 
];

export default sampleRecipes;

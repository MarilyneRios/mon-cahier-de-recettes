"use client"
import Link from "next/link";
import RecipeCard from "./Components/RecipeCard";
import { useEffect, useState } from "react";
import { collection, getDocs} from "firebase/firestore"
import{db} from "./lib/firebase";


export default function Home() {

  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    const getRecipesList = async () => {
      
        const recipesCollection = collection(db, "recipes");
        const recipesSnapshot = await getDocs(recipesCollection);
        const recipes = recipesSnapshot.docs.map((doc) => ({
         
          ...doc.data(),
          id: doc.id
        }));
        setRecipesList(recipes);
        console.log(recipesList);  
    }
  
    getRecipesList();  
  
  }, []);

  useEffect(() => {
    console.log(recipesList);
  }, [recipesList]);

  return (
    
    <main className="my-3 container">
        <div className="d-flex justify-content-between  ">
        <h4>Liste des recettes</h4>
        <Link href={"/recipes/create"} className="btn btn-primary">Ajouter une nouvelle recette</Link>
        </div>
        <div className="d-flex felx-wrap">
        {recipesList.map((recipe) => (
          recipe.imageUrl ? <RecipeCard key={recipe.id} recipeProps={recipe} /> :null
        ))}

        </div>

    </main>
  );
}

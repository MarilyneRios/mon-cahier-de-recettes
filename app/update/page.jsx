"use client"
import Link from "next/link";
import CompleteRecipeCard from "../Components/CompleteRecipeCard";
import { useEffect, useState } from "react";
import { collection, getDocs} from "firebase/firestore"
import{db} from "../lib/firebase";


export default function Update() {

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
        
           {/*  Affiche le titre et le btn add */}
           <div className="d-flex justify-content-between  ">
        <h4>Liste des recettes</h4>
        <Link href={"/recipes/create"} className="btn btn-outline-primary m-1  text-decoration-none">Ajouter une nouvelle recette</Link>
        </div>
        <div className="d-flex felx-wrap">
        {recipesList.map((recipe) => (
          recipe.imageUrl ? <CompleteRecipeCard key={recipe.id} recipeProps={recipe} /> :null
        ))}

        </div>

    </main>
  );
}

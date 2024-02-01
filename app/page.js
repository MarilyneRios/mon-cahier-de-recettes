"use client";
import Link from "next/link";
import RecipeCard from "./Components/RecipeCard";
import CompleteRecipeCard from "./Components/CompleteRecipeCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";
//importer le composant auth
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Home() {
  const [recipesList, setRecipesList] = useState([]);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  //Ecouter les changements d'état d'authentification
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const getRecipesList = async () => {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipes = recipesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecipesList(recipes);
      console.log(recipesList);
    };

    getRecipesList();
  }, []);

  useEffect(() => {
    console.log(recipesList);
  }, [recipesList]);

  //si l'utilisateur est connecté, afficher le composant
  if (user) {
    return (
      <main className="my-2 container">
      
        <div className="d-flex justify-content-between mt-4 text-white p-3">
          <h3 style={{ fontFamily: "Roboto", fontSize: "1.8rem" }}>
            Liste des recettes
          </h3>
          <div>
            <Link href={"/recipes/create"} className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-2">
              Ajouter une nouvelle recette
            </Link>
            <Link href={"/bookmarker"} className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-2">
              Accéder à mes favoris
            </Link>
          </div>

        </div>

        <div className="d-flex felx-wrap">
          {recipesList.map((recipe) =>
            recipe.imageUrl ? (
              <CompleteRecipeCard key={recipe.id} recipeProps={recipe} />
            ) : null
          )}
        </div>
      </main>
    );
  } else {
    //l'utilisateur est déconnecté, afficher un message
    return (
      <main className="d-flex felx-wrap align-items-center justify-content-center">
        <div className="d-flex felx-wrap">
          {recipesList.map((recipe) =>
            recipe.imageUrl ? (
              <RecipeCard key={recipe.id} recipeProps={recipe} />
            ) : null
          )}
        </div>
      </main>
    );
  }
}

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
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const [recipesList, setRecipesList] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
 
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

   // Récupérer la liste des recettes depuis Firebase
  useEffect(() => {
    const getRecipesList = async () => {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesData  = recipesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
     // setRecipesList(recipesData);
      console.log(recipesList);
      setFilteredRecipes(recipesData)
    };

    getRecipesList();
  }, []);

  useEffect(() => {
    console.log(recipesList);
  }, [recipesList]);

  //Afficher 3 RecipeCard par ligne
    const renderRecipeCards = (recipes) => {
      return recipes.map((recipe) => (
        <div key={recipe.id} className="col-md-4 mb-4">
          {recipe.imageUrl ? (
            user ? (
              <CompleteRecipeCard   recipeProps={recipe} />
            ) : (
              <RecipeCard recipeProps={recipe} />
            )
          ) : null}
        </div>
      ));
    };
 
  //si l'utilisateur est connecté, afficher le composant
  if (user) {
    return (
      <main className="my-2 container" >
        {/* nav bis */}
        <div className=" d-flex justify-content-between align-items-center mt-3 text-black border-success rounded py-2 px-3" 
          style={{backgroundColor: '#fafaf9'}} >
           <Link href={"/"} className="text-black  text-decoration-none cursor-pointer link-success" >
            <h3 className="fs-3" 
              style={{ fontFamily: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", monospace' }}>
              Liste des recettes
            </h3> 
           </Link>

          <div className="d-flex  justify-content-between align-items-center mx-4">
           
            <Link href={"/recipes/create"} className="btn btn-outline-success m-2" >
              Ajouter une nouvelle recette
            </Link>
          </div>
        </div>
        {/* liste des recettes */}
        <div class="container">
          <div className="row align-items-center mt-3">
          {renderRecipeCards(filteredRecipes)}
          </div>
        </div>      
      </main>
    );
  } else {
    //l'utilisateur est déconnecté, afficher un message
    return (
      <main className="container">
        <div className="row align-items-center">
        {renderRecipeCards(recipesList)}
        </div>
      </main>
    );
  }
}

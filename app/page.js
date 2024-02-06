"use client"
import Link from "next/link";
import RecipeCard from "./Components/RecipeCard";
import CompleteRecipeCard from "./Components/CompleteRecipeCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Home() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const [recipesList, setRecipesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

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
      const recipesData = recipesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecipesList(recipesData);
    };

    getRecipesList();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipesList.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render recipe cards
  const renderRecipeCards = (recipes) => {
    return recipes.map((recipe) => (
      <div key={recipe.id} className="col-md-4 mb-4">
        {recipe.imageUrl ? (
          user ? (
            <CompleteRecipeCard recipeProps={recipe} />
          ) : (
            <RecipeCard recipeProps={recipe} />
          )
        ) : null}
      </div>
    ));
  };

  return (
    <main className="my-2 container">
      {/* nav bis */}
      <div
        className="d-flex justify-content-between align-items-center mt-3 text-black border-success rounded py-2 px-3"
        style={{ backgroundColor: "#fafaf9" }}
      >
        <Link href={"/"} className="text-black text-decoration-none cursor-pointer link-success">
          <h3 className="fs-3" style={{ fontFamily: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", monospace' }}>
            Liste des recettes
          </h3>
        </Link>

        <div className="d-flex justify-content-between align-items-center mx-4">
          <Link href={"/recipes/create"} className="btn btn-outline-success m-2">
            Ajouter une nouvelle recette
          </Link>
        </div>
      </div>
      {/* liste des recettes */}
      <div className="container">
        <div className="row align-items-center mt-3">{renderRecipeCards(currentRecipes)}</div>
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 rounded"   style={{ backgroundColor: "#fafaf9" }}>
        {Array.from({ length: Math.ceil(recipesList.length / recipesPerPage) }, (_, i) => i + 1).map((pageNumber) => (
          <button  className="btn btn-outline-success m-2" key={pageNumber} onClick={() => paginate(pageNumber)} >
            {pageNumber}
          </button>
        ))}
      </div>
    </main>
  );
}

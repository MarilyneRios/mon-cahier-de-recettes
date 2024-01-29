import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export default function CreateRecipe() {
  const [recipeId, setRecipeId] = useState(""); // Add state to store the recipe ID
  const [recipe, setRecipe] = useState(null);

  const handleRecipeIdChange = (e) => {
    setRecipeId(e.target.value);
  };

  const handleReadRecipe = async () => {
    try {
      const recipeRef = doc(collection(db, "recipes"), recipeId);
      const recipeSnapshot = await getDoc(recipeRef);

      if (recipeSnapshot.exists()) {
        setRecipe(recipeSnapshot.data());
      } else {
        console.log("Recipe not found");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div>
        <h1>Read Recipe</h1>
        <div className="mb-2 col-md-9">
          <input
            className="form-control"
            type="text"
            value={recipeId}
            onChange={handleRecipeIdChange}
            placeholder="Enter Recipe ID"
            required
          />
        </div>
        <div className="mt-1 d-flex justify-content-center">
          <button className="btn btn-outline-primary" onClick={handleReadRecipe}>
            Read Recipe
          </button>
        </div>

        {recipe && (
          <div>
            <h2>{recipe.title}</h2>
            <img src={recipe.imageUrl} alt="Recipe" />
            <p>Category: {recipe.category}</p>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Instructions: {recipe.instructions}</p>
            <p>Comments: {recipe.comments}</p>
         
          </div>
        )}
      </div>
    </div>
  );
}

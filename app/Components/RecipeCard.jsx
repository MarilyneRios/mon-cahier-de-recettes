import React from "react";
import Image from "next/image";
import Link from "next/link";


//recipe-card
export default function RecipeCard({ recipeProps, handleDeleteRecipe }) {
  return (
    <div className="me-4 mt-4 d-flex align-items-center justify-content-center form-shadow rounded card-scale-transform">
      <Link href={"/recipes/" + recipeProps.id} className="text-decoration-none">
        <div className="card" style={{ width: "250px"}}>
           
          <Image
            className="card-img-top rounded d-flex align-items-center justify-content m-o"
            src={recipeProps.imageUrl}
            alt="image de la recette"
            width={150}
            height={152}
          />
        
          <div className="card-body">
            <h5 className="card-title">{recipeProps.title}</h5>
            <p className="card-text" style={{ height: "1.5rem", overflowY: "auto" }}>{recipeProps.category}</p>
            <p className="card-text" style={{ height: "1.5rem", overflowY: "auto" }}>{recipeProps.instructions}</p>
            <p className="card-text" style={{ height: "1.5rem", overflowY: "auto" }}>{recipeProps.comments}</p>
          </div>
        </div>
      </Link>
  
    </div>
  );
}
import React from "react";
import Image from "next/image";


//recipe-card
export default function RecipeCard({recipeProps}) {
  return (
    <div className="me-3 mt-3 d-flex align-items-center justify-content-center form-shadow rounded card-scale-transform">
      
        <div className="card" style={{ width: "250px"}}>
           
          <Image
            className="card-img-top rounded d-flex align-items-center justify-content m-o"
            src={recipeProps.imageUrl}
            alt="L'image de la recette"
            width={150}
            height={150}
          />
        
          <div className="card-body">
            <h5 className="card-title">{recipeProps.title}</h5>
            <p className="card-text" style={{ height: "1.5rem", overflowY: "auto" }}>{recipeProps.category}</p>
            <p className="card-text" style={{ height: "1.5rem", overflowY: "auto" }}>{recipeProps.username}</p>

          </div>
        </div>
      
  
    </div>
  );
}

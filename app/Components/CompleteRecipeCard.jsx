import React from "react";
import Image from "next/image";
import Link from "next/link";

//Fuul-recipe-card
export default function CompleteRecipeCard({ recipeProps }) {
  return (
    <>
    

      <div id="myList"
      className="d-flex align-items-center justify-content-center ">
      <div className="me-4 mt-4 d-flex align-items-center justify-content-center form-shadow rounded card-scale-transform">
        <div className="card" style={{ width: "250px", position: "relative" }}>
        <button 
           type="button" 
           onClick={handleDeleteRecipe}
           className="btn-close position-absolute top-0 end-0 " 
           aria-label="Close">
       </button>
          <Image
            className="card-img-top rounded d-flex align-items-center justify-content"
            src={recipeProps.imageUrl}
            alt="image de la recette"
            width={230}
            height={230}
          />
          <div className="card-body">
            <h5 className="card-title">{recipeProps.title}</h5>
            <p
              className="card-text"
              style={{ height: "5rem", overflowY: "auto" }}
            >
              {recipeProps.category}
            </p>

            <p
              className="card-text"
              style={{ height: "5rem", overflowY: "auto" }}
            >
              {recipeProps.instructions}
            </p>
            <p
              className="card-text"
              style={{ height: "5rem", overflowY: "auto" }}
            >
              {recipeProps.comments}
            </p>
          </div>
          <Link
            href={"/recipes/" + recipeProps.id}
            className="btn btn-outline-primary m-1 text-decoration-none"
          >
            Modifer la recette
          </Link>
        </div>
      </div>
      <style jsx>{`
        .btn-close {
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
      `}</style>
      </div>
   
    </>
  );
}

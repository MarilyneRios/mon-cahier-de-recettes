import React from "react";
import Link from "next/link";

export default function NavListAdd() {

 
  return (
    <div className="h-50%">
      <div className="d-flex justify-content-between  mt-3 ">
        <h4 className="text-black fs-3">
          Liste de mes recettes favorites
        </h4>
        <div>
          <Link
            href={"/recipes/create"}
            className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-2"
          >
            Ajouter une nouvelle recette
          </Link>
          <Link
            href={"/"}
            className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-2"
          >
            Retour à la liste des recettes
          </Link>
        </div>
      </div>
    </div>
  );
}

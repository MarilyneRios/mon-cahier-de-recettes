import React from "react";
import Link from "next/link";

export default function NavListAdd() {
  return (
    <div>
      <div className="d-flex justify-content-between mt-4 ">
        <h4 style={{ fontFamily: "Roboto", fontSize: "1.6rem" }}>
          Liste des recettes
        </h4>
        <div>
          <Link
            href={"/recipes/create"}
            className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-2"
          >
            Ajouter une nouvelle recette
          </Link>
          <Link
            href={"/bookmarker"}
            className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-2"
          >
            Retour à la liste des recettes
          </Link>
        </div>
      </div>
    </div>
  );
}

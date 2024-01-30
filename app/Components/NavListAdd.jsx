import React from "react";

export default function NavListAdd() {
  return (
    <div>
      <div className="d-flex justify-content-between mt-4 ">
        <h4 style={{ fontFamily: "Roboto", fontSize: "1.6rem" }}>
          Liste des recettes
        </h4>
        <Link href={"/recipes/create"} className="btn btn-primary">
          Ajouter une nouvelle recette
        </Link>
      </div>
    </div>
  );
}

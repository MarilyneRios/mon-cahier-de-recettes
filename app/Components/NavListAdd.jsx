import React from "react";
import Link from "next/link";

export default function NavListAdd() {

    //style
    const linkStyle = {
      fontFamily: "Roboto",
      fontSize: "1.8rem",
    
    };

  return (
    <div className="h-50%">
      <div className="d-flex justify-content-between text-white mt-4 ">
        <h4 style={linkStyle}>
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

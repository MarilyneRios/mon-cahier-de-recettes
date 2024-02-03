import React from "react";
import Link from "next/link";

export default function ButtonChange({ id }) { //{recipeProps}
  return (
    <div>
      <Link
       // href={"/recipes/" + recipeProps.id}
        href={`/recipes/${id}`}
        className="btn btn-outline-success m-1 text-decoration-none"
      >
        Modifer la recette
      </Link>
    </div>
  );
}

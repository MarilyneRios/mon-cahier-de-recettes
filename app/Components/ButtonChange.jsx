import React from 'react'

export default function ButtonChange() {
  return (
    <div>
                <Link
              href={"/recipes/" + recipeProps.id}
              className="btn btn-outline-primary m-1 text-decoration-none"
            >
              Modifer la recette
            </Link>
    </div>
  )
}

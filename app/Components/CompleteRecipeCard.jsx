import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ButtonRead from "./ButtonRead";

export default function CompleteRecipeCard({ recipeProps }) {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  //Ecouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Fonction de nettoyage
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <div
        id="myList"
        className="d-flex align-items-center justify-content-center"
      >
        <div
          className={`me-4 mt-4 d-flex align-items-center justify-content-center form-shadow rounded`}
        >
          <div
            className="card"
            style={{ width: "20rem", position: "relative" }}
          >
            <div>
              <ButtonRead />
            </div>
            <Image
              className="card-img-top rounded d-flex align-items-center justify-content"
              src={recipeProps.imageUrl}
              alt="L'image de la recette complète"
              width={150}
              height={150}
            />
            <div className="card-body">
              <h5 className="card-title">{recipeProps.title}</h5>
              <p
                className="card-text"
                style={{ height: "3rem", overflowY: "auto" }}
              >
                {recipeProps.category}
              </p>
              <p
                className="card-text"
                style={{ height: "3rem", overflowY: "auto" }}
              >
                {recipeProps.ingredients}
              </p>
              <p
                className="card-text"
                style={{ height: "3rem", overflowY: "auto" }}
              >
                {recipeProps.instructions}
              </p>
              <p
                className="card-text"
                style={{ height: "2rem", overflowY: "auto" }}
              >
                {recipeProps.comments}
              </p>
              <p
                className="card-text"
                style={{ height: "2rem", overflowY: "auto" }}
              >
                {recipeProps.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

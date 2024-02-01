import React from "react";
import Image from "next/image";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import{db} from "../lib/firebase";

//Full-recipe-card
export default function CompleteRecipeCard({ recipeProps }) {

  const [user, setUser] = useState(null);
  const auth = getAuth();
  const [isBookmarked, setIsBookmarked] = useState("");
  const [bookmarkerBtnStyle, setBookmarkerBtnStyle] = useState("");

    //Ecouter les changements d'état d'authentification
    useEffect(() => {
      return onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    }, []);


  const handleBookmarkClick = () => {
    // Si l'utilisateur n'est pas connecté, on arrête la fonction
    if (!user) {
      return;
    }
    // Sinon, on récupère la collection des favoris de l'utilisateur dans la base de données
    const bookmarksRef = collection(db, "users", user.uid, "bookmarks");
    // On vérifie si la recette est déjà dans les favoris de l'utilisateur
    getDocs(bookmarksRef).then((querySnapshot) => {
      let isBookmarked = false;
      querySnapshot.forEach((doc) => {
        // Si la recette a le même id que celui passé en props, on met la variable à true
        if (doc.id === recipeProps.id) {
          isBookmarked = true;
        }
      });
      // Si la recette est déjà dans les favoris, on la supprime de la base de données et on change le style du bouton
      if (isBookmarked) {
        deleteDoc(doc(bookmarksRef, recipeProps.id));
        setBookmarkerBtnStyle({ color: "" });
      } else {
        // Sinon, on ajoute la recette à la base de données et on change le style du bouton
        setDoc(doc(bookmarksRef, recipeProps.id), {
          ...recipeProps,
          createdAt: serverTimestamp(),
        });
        setBookmarkerBtnStyle({ color: "#E9BE59" });
      }
    });
    console.log(handleBookmarkClick)
  };

    

  return (
    <>
      <div
        id="myList"
        className="d-flex align-items-center justify-content-center "
      >
        <div className="me-4 mt-4 d-flex align-items-center justify-content-center form-shadow rounded card-scale-transform">
          <div
            className="card"
            style={{ width: "250px", position: "relative" }}
          >
            <button
              type="button"
              id="bookmarker"
              className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover  position-absolute top-0 end-0 m-2"
              aria-label="bookmarker"
              onClick={handleBookmarkClick}
            >
              <i className="bi bi-bookmark"></i><span>favoris</span>
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

          </div>
        </div>
      </div>
    </>
  );
}

"use client"
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import CompleteRecipeCard from "../Components/CompleteRecipeCard";
import NavListAdd from "../Components/NavListAdd";

//recipe-card
export default function Bookmarker({  }) {

  const [user, setUser] = useState(null);
  const auth = getAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState([]);


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



  let favoriteRecipes = 
  <div className= "p-4  m-2" >
      <p className="my-5 p-5 d-flex justify-content-center text-white" style={{fontSize: "3rem",fontFamily: "Roboto", backgroundColor: "rgba(255, 255, 255, 0.25)"}}>Pas de recette</p>
  </div>

  if (bookmarks.length > 0) {
    favoriteRecipes = bookmarks.map((data, i) => {
      return <CompleteRecipeCard key={i} recipeProps={data} isBookmarked />;
    });
  }

  return (
    
    <main className="my-3 container">
        
        <div>
         <NavListAdd/>
         <div id="bookmarkerContainer">
          {favoriteRecipes}
         </div>
        </div>

    </main>
  );
}

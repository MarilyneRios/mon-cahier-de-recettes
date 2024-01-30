"use client"
import Link from "next/link";
import { useState,useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged  } from "firebase/auth";
import { useRouter } from "next/navigation"; //attention PAS "next/router";

export default function Header() {

  //gérer l'état de connexion
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 //définir la variable auth
 const auth = getAuth();
 const router = useRouter();

   //style 
   const linkStyle = {
    fontFamily: "Roboto",
    fontSize: "2rem",
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = async (e) => {
    //prévenir le comportement par défaut du bouton
    e.preventDefault();
    
    signOut(auth)
      .then((userCredential) => {
        // logout
        const user = userCredential.user;
        console.log(user);
        window.alert("Sign-out successful user");
        router.push("/recipes/lire");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorMessage);
      });
  setIsLoggedIn(false);
};

  // Utiliser useEffect pour écouter les changements d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // L'utilisateur est connecté
        setIsLoggedIn(true);
      } else {
        // L'utilisateur est déconnecté
        setIsLoggedIn(false);
      }
    });
    // Se désabonner de l'écouteur à la fin du composant
    return () => unsubscribe();
  }, []);

  //jsx
  return (
    <div className="container-flux ">
      <nav
        className="navbar  navbar-expand-sm bg-custom-color border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link
            href={"/"}
            className="navbar-brand display-1 "
            style={linkStyle}
          >
            Mon cahier de recettes
          </Link>
          <div className="d-flex align-items-center justify-content-center box-shadow mx-auto my-1">
          <input id="search-input"  class="form-control w-10 h-25 bg-white text-black-placeholder text-black bg-gradient" type="search" placeholder="Rechercher un recette" aria-label="Search"/>
           <button id="search-button" class="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-2 " type="submit">Rechercher</button>
          </div>
     
          
          {/* Affichez les liens de connexion ou de déconnexion en fonction de l'état */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-1"
              >
                Se déconnecter
              </button>
            ) : (
              <>
                <Link
                  href={"/signup"}
                  className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-1"
                >
                  Créer un compte
                </Link>
                <Link
                  href={"/signin"}
                  className="btn btn-outline-dark bg-white text-black bg-black-hover text-white-hover m-1"
                >
                  Se connecter
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

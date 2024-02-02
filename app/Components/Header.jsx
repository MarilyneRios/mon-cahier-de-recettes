"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation"; //attention PAS "next/router";

export default function Header() {
  //gérer l'état de connexion
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //définir la variable auth
  const auth = getAuth();
  const router = useRouter();

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
      <nav className="navbar  navbar-light bg-light">
        <div className="container  d-flex justify-content-around align-items-center">
        <Link  
            href={"/" }
            className="navbar-brand fs-2 text-black"
            style={{ fontFamily: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", monospace' }}>
            Mes recettes
        </Link>

        {/* barre de recherche*/}
        <form className="d-flex my-1">
          <input className="form-control me-2" type="search" placeholder="nom de la recette" />
          <button className="btn btn-outline-success btn-sm px-2" type="submit">Rechercher</button>
        </form>
          

          {/* Affichez les liens de connexion ou de déconnexion en fonction de l'état */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="btn btn-outline-success  m-1 "
              >
                Se déconnecter
              </button>
            ) : (
              <>
                <Link
                  href={"/signup"}
                  className="btn btn-outline-success  m-1"
                >
                  Créer un compte
                </Link>
                <Link
                  href={"/signin"}
                  className="btn btn-outline-success  m-1"
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


import Link from "next/link";
export default function Header() {


  const linkStyle = {
    fontFamily: "Roboto",
    fontSize: "2rem",
  };

 
  //jsx
  return (
    <div>
      {/* Barre de navigation avec des classes Bootstrap */}
      <nav
        className="navbar bg-custom-color border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container">
          {/* Logo ou titre du site avec un lien vers la page d'accueil */}
          <Link
            href={"/"}
            className="navbar-brand display-1 "
            style={linkStyle}
          >
            Mon cahier de recettes
          </Link>
          {/* Bouton de lien vers la page de connexion */}
          <div>
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
          </div>
        </div>
      </nav>
    </div>
  );
}

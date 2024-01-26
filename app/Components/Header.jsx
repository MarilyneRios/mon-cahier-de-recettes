import Link from "next/link";

export default function Header() {
  return (
    <div>
      {/* Barre de navigation avec des classes Bootstrap */}
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container">  
         {/* Logo ou titre du site avec un lien vers la page d'accueil */}
          <Link href={"/"} className="navbar-brand">Mon cahier de recettes</Link>
           {/* Bouton de lien vers la page de connexion */}
            <Link 
            href={"/signin"}
            className="btn btn-outline-success" >
              Se connecter
            </Link>
          
        </div>
      </nav>
    </div>
  );
}

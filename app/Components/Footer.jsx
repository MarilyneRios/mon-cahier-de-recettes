import React from "react";
import Link from "next/link";

export default function Footer() {
  const linkStyle = {
    fontFamily: "Roboto",
    fontSize: "0.9rem",
  };
  return (
    <div >
   
      <div className='text-center py-1'>
        
        <p  style={linkStyle}> <span className="fw-bold" >Ce site est un exercice d'entrainement</span> avec Nextjs14, Bootstrap and Firebase, 
        <span className="fst-italic">Copyright © 2024 by Marilyne Rios</span> <Link
          href="mailto:Roads<rios.marilyne@gmail.com>"
          className="btn btn-link link-underline-light"
        >
          Contact
        </Link></p>
        <p style={linkStyle}>Vous pouvez utiliser un email factice pour vous connecter et tester le site.</p>
      </div>
    </div>
  );
}

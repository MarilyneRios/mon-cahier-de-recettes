"use client"
import React from "react";
import Link from "next/link";

export default function Footer() {
  const linkStyle = {
    fontFamily: "Roboto",
    fontSize: "0.9rem",
    
  };


  return (
    <div  className="container-fluid panel-footer p-3 text-center"  style={linkStyle}>
   
      <div className='d-flex flex-column align-items-center justify-content-center '>
        
        <p  > <span className="fw-bold" >Ce site est un exercice d'entrainement</span> avec Nextjs14, Bootstrap and Firebase,  
        <span className="fst-italic">{" "} Copyright © 2024 by Marilyne Rios</span> </p>
        <p >Vous pouvez utiliser un email factice pour vous connecter et tester le site.
       
        </p>
        <div>
        <Link
          href="mailto:Roads<rios.marilyne@gmail.com"
          className="btn btn-link link-underline-light contact-details"
        >
          Contact
        </Link>
        <Link
          href="https://github.com/MarilyneRios"
          target="_blank"
          className="btn btn-link link-underline-light contact-details"
        >
         GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/marilyne-rios-59a13015b"
          target="_blank"
          className="btn btn-link link-underline-light contact-details"
        >
          linkedin
        </Link>
        </div>

      </div>
    </div>
  );
}
//pour utiliser target="_blank", il faut "use client"
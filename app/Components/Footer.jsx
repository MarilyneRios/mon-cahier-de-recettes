"use client"
import React from "react";
import Link from "next/link";

export default function Footer() {

  return (
    <div  className="container-fluid panel-footer p-3 text-center mt-auto fs-6"  
    style={{  fontFamily: "Roboto",backgroundColor: '#fafaf9'}}>
   
      <div className='d-flex flex-column align-items-center justify-content-center '>
        
        <p  > <span className="fw-bold" >Ce site est un exercice d'entrainement</span> avec Nextjs14, Bootstrap and Firebase,  
        <span className="fst-italic">{" "} Copyright © 2024 by Marilyne Rios</span> </p>
        <p >Vous pouvez utiliser un email factice pour vous connecter et tester le site.
       
        </p>
        <div>
        <Link
          href="mailto:Roads<rios.marilyne@gmail.com"
          className="link-underline-light link-success link-offset-2 link-underline-opacity-100-hover fs-5 me-2"
        >
          Contact
        </Link>
        <Link
          href="https://github.com/MarilyneRios"
          target="_blank"
          className="link-underline-light link-success link-offset-2 link-underline-opacity-100-hover fs-5 me-2"
        >
         GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/marilyne-rios-59a13015b"
          target="_blank"
          className="link-underline-light link-success link-offset-2 link-underline-opacity-100-hover fs-5"
        >
          Linkedin
        </Link>
        </div>

      </div>
    </div>
  );
}
//pour utiliser target="_blank", il faut "use client"
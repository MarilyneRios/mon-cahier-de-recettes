import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ButtonChange from "./ButtonChange";
import { useRouter } from "next/navigation";

export default function CompleteRecipeCard({ recipeProps }) {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const { id } = recipeProps; 
  const [isBigCard, setIsBigCard] = useState(false);
  const router = useRouter();


  //Ecouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

 

  const handleBigCardClick = () => {
    setIsBigCard(!isBigCard);
  };

  return (
    <>
      <div
        id="myList"
        className="d-flex align-items-center justify-content-center"
        style={{ position: isBigCard ? "relative" : "static", zIndex: isBigCard ? 1 : 0, marginTop: isBigCard ? "15rem": "1rem" }}
      >
        <div className={`me-4 mt-4 d-flex align-items-center justify-content-center form-shadow rounded`}>
          <div className={`card ${isBigCard ? "big-card" : ""}`}
              style={{ width: isBigCard ? "30rem" : "20rem", 
              height: isBigCard ? "55rem" : "35rem", 
              position: isBigCard ?  "absolute" :"relative", 
              marginLeft: isBigCard ? "1.5rem" : "auto", 
              }}
          >
            <div  className="d-flex align-items-center justify-content-between">

              <button type="button" 
                 onClick={handleBigCardClick} 
                 className="btn btn-outline-success m-1 text-decoration-none"
              >
                Lire
              </button>
              <ButtonChange id={id} />
   
      
            </div>
            <Image
              className="card-img-top rounded d-flex align-items-center justify-content"
              src={recipeProps.imageUrl}
              alt="L'image de la recette complète"
              width={150}
              height={150}
            />
            <div className="card-body">
              <h4 className="card-title" style={{backgroundColor: '#fafaf9', height: '2rem', textAlign: "center",borderRadius: "5px" }}>{recipeProps.title}</h4>
              <p
                className="card-text"
                style={{ height: "2rem", textAlign: "center",backgroundColor: '#fafaf9'}}
              >
                {recipeProps.category}
              </p>
              <p
                className="card-text"
                style={{
                   height: isBigCard ? "10rem" : "3rem",
                    overflowY: "auto",
                    backgroundColor: '#fafaf9',
                    paddingLeft:"1rem",
                   borderRadius: "5px",
                }}
              >
                {recipeProps.ingredients}
              </p>
              <p
                className="card-text"
                style={{
                   height: isBigCard ? "15rem" : "3rem",
                    overflowY: "auto",
                    backgroundColor: '#fafaf9',
                    paddingLeft:"1rem",
                   borderRadius: "5px",
                }}
              >
                {recipeProps.instructions}
              </p>
              <p
                className="card-text"
                style={{
                   height: isBigCard ? "4rem" : "3rem",
                    overflowY: "auto",
                    backgroundColor: '#fafaf9',
                    paddingLeft:"1rem",
                   borderRadius: "5px",
                }}
              >
                {recipeProps.comments}
              </p>
              <p
                className="card-text"
                style={{
                   height: isBigCard ? "2rem" : "2rem",
                   backgroundColor: '#fafaf9',
                   paddingLeft:"1rem",
                   borderRadius: "5px",
                }}
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

"use client";
import React from "react";
//importer le composant auth
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Bookmarker() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const router = useRouter();
  
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

  //si l'utilisateur est connecté, afficher le composant
  if (user) {
    return <div className="d-flex justify-content-between mt-4 "></div>;
  }
}

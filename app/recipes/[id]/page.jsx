"use client";
//import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
//importer le composant auth
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ButtonBack from "@/app/Components/ButtonBack";


export default function DetailsRecipeCard({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [comments, setComments] = useState("");
  const [username, setUsername] = useState ("");
  const [files, setFiles] = useState("");
  const [user, setUser] = useState(null);
  const auth = getAuth();

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

  useEffect(() => {
    const getDetailsRecipeCard = async () => {
      try {
        const recipeDoc = await getDoc(doc(db, "recipes", params.id));

        if (recipeDoc.exists()) {
          const data = recipeDoc.data();
          setTitle(data.title);
          setCategory(data.category);
          setIngredients(data.ingredients);
          setInstructions(data.instructions);
          setComments(data.comments);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    getDetailsRecipeCard();
  }, [params.id]);

  const handleSubmit = async (e) => {
    //évite le rechargement de la page dans le cas d'un formulaire
    e.preventDefault();
    const recipeDoc = doc(db, "recipes", params.id);
    await updateDoc(recipeDoc, {
      title: title,
      category: category,
      ingredients: ingredients,
      instructions: instructions,
      comments: comments,
      username: username,
    });
    router.push("/");
  };

  //si l'utilisateur est connecté, afficher le composant
  if (user) {
    return (
      <div
        className="container  d-flex flex-column align-items-center justify-content-center"
      >
        <form
          className="border border-success rounded py-2 px-5 shadow-lg form-shadow w-75 my-3"
          style={{ backgroundColor: "#fafaf9"}}
          onSubmit={handleSubmit}
        >
            <ButtonBack/>
          <h1 className="fs-3 my-2 text-center  text-success" 
          style={{ fontFamily: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", monospace' }}>
            Modifier la recette
          </h1>
          <div className="my-2 ">
            <input
              className="form-control input-lg"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="titre"
              required
            />
          </div>
          <div className="my-2 ">
            {/* <label htmlFor="category">Catégorie : &nbsp;</label>*/}
            <select
              className="form-select input-lg"
              aria-label="Default select example"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selectionner une Categorie</option>
              <option value="aperitif">Apéro</option>
              <option value="starter">Entrée</option>
              <option value="mainCourse">Plat</option>
              <option value="dessert">Dessert</option>
              <option value="drink">boisson</option>
            </select>
          </div>
          <div className="my-2 ">
            <textarea
              className="form-control input-lg"
              type="text"
              rows={3}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Les ingrédients"
              required
            />
          </div>
          <div className="my-2 ">
            <textarea
              className="form-control input-lg"
              type="text"
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Les instructions"
              required
            />
          </div>
          <div className="my-2 ">
            <textarea
              className="form-control input-lg"
              type="text"
              rows={1}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Ajouter un commentaire"
              required
            />
          </div>
          <div className="my-2 ">
            <input
              className="form-control input-lg"
              type="text"
              rows={1}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ajouter un pseudo"
              required
            />
          </div>

          <div className="my-2  d-flex justify-content-center">
            <button
              className="btn btn-outline-success w-100"
              onClick={handleSubmit}
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    //l'utilisateur est déconnecté, afficher un message
    return (
<div className="p-4  m-2 ">
  <p className="my-5 p-5 d-flex justify-content-center text-success fs-5 rounded" 
    style={{ fontFamily: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", monospace', backgroundColor: "#fafaf9",  opacity: 0.8}}
  >
    Veuillez vous connecter pour voir les détails de la recette.
  </p>
</div>
    );
  }
}

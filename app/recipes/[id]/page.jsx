"use client";
//import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";

import { getDoc, doc, updateDoc } from "firebase/firestore";

import { useRouter } from "next/navigation";

export default function DetailsRecipeCard({ params }) {
    const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [comments, setComments] = useState("");
  const [files, setFiles] = useState("");

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
    await updateDoc (recipeDoc, {
        title: title,
        category:category,
        ingredients: ingredients,
        instructions:instructions,
        comments: comments,

    })
    router.push("/")
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center "
      style={{ height: "85vh", overflowY: "auto", backgroundColor: "#f8f9fa" }}
    >
      <form
        className="d-flex  flex-column  align-items-center justify-content-center mt-4 custom-width  border border-black rounded p-3 form-shadow"
        style={{ backgroundColor: "#ffffff" }}
        onSubmit={handleSubmit}
      >
        <h1 className="mb-1 text-center " style={{ color: "#007bff" }}>
          {" "}
          Modifier la recette
        </h1>
        <div className="mb-2 col-md-9">
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="titre"
            required
          />
        </div>
        <div className="mb-2 col-md-9">
          {/* <label htmlFor="category">Catégorie : &nbsp;</label>*/}
          <select
            className="form-select"
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
        <div className="mb-2 col-md-9">
          <textarea
            className="form-control"
            type="text"
            rows={3}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Les ingrédients"
            required
          />
        </div>
        <div className="mb-2 col-md-9">
          <textarea
            className="form-control"
            type="text"
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Les instructions"
            required
          />
        </div>
        <div className="mb-2 col-md-9">
          <textarea
            className="form-control"
            type="text"
            rows={1}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Ajouter un commentaire"
            required
          />
        </div>

        <div className="mt-1  d-flex justify-content-center">
          <button className="btn btn-outline-primary w-100">Envoyer</button>
        </div>
      </form>
    </div>
  );
}

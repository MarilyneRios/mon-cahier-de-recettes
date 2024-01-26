"use client"
//import { Form } from "react-bootstrap";
import {useState } from "react";
import { storage } from "../../lib/firebase";
import { ref } from "firebase/storage";

export default function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [comments, setComments] = useState("");
  const [files, setFiles] = useState("");

  const handleImageUpload = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleSubmit = () => {
    e.preventDefault();

    const storageRef = ref (storage, files.name);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{"height": "90vh", "backgroundColor": "#f8f9fa"}}>
      <form  
      className="w-90  border border-black rounded p-5 m-0 shadow-lg" 
      style={{ "backgroundColor": "#ffffff" }}
      onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-center " style={{ color: "#007bff" }}> Créer une recette</h1>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="titre"
            required
          />
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
        <textarea
            className="form-control"
            type="text"
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Les ingrédients"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
              className="form-control"
              type="text"
              rows={5}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Les instructions"
              required
            />
        </div>
        <div className="mb-3">
        <textarea
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Ajouter un commentaire"
              required
            />
        </div>
        <div className="mb-3">
          <input type="file" className="form-control" onChange={handleImageUpload} required/>
        </div>
        <div className="mt-4  d-flex justify-content-center">
          <button className="btn btn-outline-primary w-100">Envoyer</button>
        </div>
      </form>
    </div>
  );
}

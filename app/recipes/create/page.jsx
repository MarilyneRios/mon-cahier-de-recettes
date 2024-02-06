// Importation des modules nécessaires
"use client";
import { useState } from "react";
import { auth, storage, db } from "../../lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import ButtonBack from "@/app/Components/ButtonBack";

// Définition du composant CreateRecipe
export default function CreateRecipe() {
  // Déclaration des états
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [comments, setComments] = useState("");
  const [username, setUsername] = useState("");
  const [files, setFiles] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Initialisation du routeur Next.js
  const router = useRouter();

  // Fonction pour gérer le téléchargement de l'image
  const handleImageUpload = (e) => {
    setFiles(e.target.files[0]);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Désactiver le bouton dès le début du traitement
    setIsButtonDisabled(true);

    try {
      const storageRef = ref(storage, files.name);
      const metadata = {
        contentType: 'image/jpeg'
      };

      // Créer une tâche de téléchargement
      const uploadTask = uploadBytesResumable(storageRef, files, metadata);

      // Écouter les changements d'état, les erreurs et la fin du téléchargement.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Suivi de la progression de l'upload...
        },
        (error) => {
          // Gestion des erreurs pendant l'upload...
          console.error("Error during upload:", error);
          setIsButtonDisabled(false); // Réactiver le bouton en cas d'erreur
        },
        async () => {
          // Upload réussi, obtenir l'URL de téléchargement
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Enregistrement des données dans la base de données
          const recipesCollection = collection(db, "recipes");
          await addDoc(recipesCollection, {
            title: title,
            category: category,
            ingredients: ingredients,
            instructions: instructions,
            comments: comments,
            imageUrl: downloadURL,
            username: username,
            userId: auth.currentUser.uid,
          });

          // Réinitialisation des champs et redirection
          setTitle("");
          setIngredients("");
          setInstructions("");
          setComments("");
          setUsername("");
          setFiles("");
          router.push("/");
          setIsButtonDisabled(false); // Réactiver le bouton après le traitement
        }
      );
    } catch (error) {
      // Gestion des erreurs générales
      console.error("General error:", error);
      setIsButtonDisabled(false); // Réactiver le bouton en cas d'erreur
    }
  };


  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
    >
      <form
        className="border border-success rounded py-2 px-5 shadow-lg form-shadow w-75 my-3"
        style={{ backgroundColor: "#fafaf9"}}
        onSubmit={handleSubmit}
      >
        <ButtonBack/>
        <h1 className="fs-1 my-2 text-center text-success" 
          style={{ fontFamily: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", monospace' }}>
          {" "}
          Créer une recette
        </h1>
        <div className="mb-2">
          <input
            className="form-control input-lg"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="titre"
            required
          />
        </div>
        <div className="mb-2 ">
          {/* <label htmlFor="category">Catégorie : &nbsp;</label>*/}
          <select
            className="form-control input-lg"
            aria-label="Default select example"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selectionner une Categorie</option>
            <option value="Apéritif">Apéritif</option>
            <option value="Entrée">Entrée</option>
            <option value="Plat">Plat</option>
            <option value="Dessert">Dessert</option>
            <option value="Boisson">Boisson</option>
          </select>
        </div>
        <div className="mb-2">
          <textarea
            className="form-control input-lg"
            type="text"
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Les ingrédients"
            style={{ height: "auto", resize: "none" }}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control  input-lg"
            type="text"
            rows={5}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Les instructions"
            style={{ height: "auto", resize: "none" }}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control input-lg"
            type="text"
            rows={1}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Ajouter un commentaire"
            style={{ height: "auto", resize: "none" }}
            required
          />
        </div>
        <div className="mb-2">
          <input
            className="form-control input-lg"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="pseudo"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="file"
            class="form-control input-lg"
            onChange={handleImageUpload}
            required
          />
        </div>
        <div className="mb-1  d-flex justify-content-center">
          <button className="btn btn-outline-success w-100"
          disabled={isButtonDisabled} 
          >Envoyer</button>
        </div>
      </form>
    </div>
  );
}

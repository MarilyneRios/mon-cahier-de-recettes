"use client";
//import { Form } from "react-bootstrap";
import { useState } from "react";
import { auth, storage, db } from "../../lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, getDocs,getDoc, addDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [comments, setComments] = useState("");
  const [username, setUsername] = useState ("");
  const [files, setFiles] = useState("");

  const router = useRouter();

  const handleImageUpload = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    //évite le rechargement de la page dans le cas d'un formulaire
    e.preventDefault();

    const storage = getStorage();

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

    // **exemple complet de téléchargement de firebase**
    const storageRef = ref(storage, files.name ); 
    const uploadTask = uploadBytesResumable(storageRef, files, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          //télécharger les datas des inputs
          const recipesCollection = collection(db, "recipes");
          const recipesSnapshot = await getDocs(recipesCollection); //getDoc
          try{
            await addDoc(recipesCollection,{
              title: title,
              category: category,
              ingredients: ingredients,
              instructions:instructions,
              comments: comments,
              imageUrl: downloadURL,
              username: username,
              userId: auth.currentUser.uid,
            })
          }
          catch (error){
            alert("Something went wrong", error)
          }
          setTitle("");
          setIngredients("");
          setInstructions("");
          setComments("");
          setUsername ("");
          setFiles(""); 
          
          router.push("/")
        });
      }
    );
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center mb-2 "
      style={{ height: "85vh", overflowY: "auto", backgroundColor: "#f8f9fa" }}
    >
      <form
        className="d-flex  flex-column  align-items-center justify-content-center mt-4 custom-width  border border-black rounded p-1 form-shadow"
        style={{ backgroundColor: "#ffffff" }}
        onSubmit={handleSubmit}
      >
        <h1 className="mb-1 text-center " style={{ color: "#007bff" }}>
          {" "}
          Créer une recette
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
        <div className="mb-2 col-md-9">
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="pseudo"
            required
          />
        </div>
        <div className="mb-2 col-md-9">
          <input
            type="file"
            class="form-control"
            onChange={handleImageUpload}
            required
          />
           
        </div>
        <div className="mb-1  d-flex justify-content-center">
          <button className="btn btn-outline-primary w-100">Envoyer</button>
        </div>
      </form>
    </div>
  );
}

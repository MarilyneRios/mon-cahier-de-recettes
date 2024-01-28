"use client";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";


export default function SignUp() {
  

 // const auth = getAuth();//

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    await createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        window.alert("successfully create user")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorMessage);
      });
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{"height": "90vh", "backgroundColor": "#f8f9fa"}}
    >
      <form
        onSubmit={handleSignUp}
        className="w-50  border border-black rounded p-5 m-0 form-shadow" 
        style={{ "backgroundColor": "#ffffff" }}>
        <div className="fs-3 my-3 text-center mb-5 mt-1 fw-bold">
          Créer un compte
        </div>

        <div className="mb-4">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label text-center"
          >
            Addresse Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@gmail.com"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text text-center">
            Nous ne partagerons jamais votre adresse e-mail.
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label text-center"
          >
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            placeholder="***********"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button
          type="submit"
          
          className="btn btn-primary mt-2 mb-2 form-control"
        >
          Enregistrer
        </button>
        <p className="mt-3 form-text text-center">
          Vous avez déjà un compte ? {""}
          <Link href="/signin" className=" link-underline-light">
            Connectez-vous.
          </Link>
        </p>
      </form>
    </div>
  );
}

"use client";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; //attention PAS "next/router";
import { getAuth } from "firebase/auth";
import Link from "next/link";


export default function SignUp() {
  
  const auth = getAuth();
  const router = useRouter();

  const handleSignIn = async (e) => {
    
    e.preventDefault();
    const { email, password } = e.target.elements;

    await signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        window.alert("successfully signin user");
        router.push("/");
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
      
    >
      <form
        onSubmit={handleSignIn}
        className=" border border-black rounded py-2 px-5 form-shadow" style={{ "backgroundColor": "#ffffff" }}
      >
        <div className="fs-3 my-3 text-center mb-2 mt-1 fw-bold">
          Se connecter
        </div>

        <div className="mb-2">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label text-center"
          >
            Addresse email factice
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@factice.com"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text text-center">
            Nous ne partagerons jamais votre adresse e-mail.
          </div>
        </div>
        <div className="mb-2">
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
          
          className="btn btn-primary mt-2  form-control"
        >
          Se connecter
        </button>
        <p className="mt-2 form-text text-center">
          Nouvel utilisateur ? {""}
          <Link href="/signup" className=" link-underline-light">
            Enregistrez-vous.
          </Link>
        </p>
        {/*<p className="mt-1 form-text text-center">
          Vous ne vous souvenez plus de votre mot de passe ? {""}
          <Link href="/signup" className=" link-underline-light">
            Mot de passe oublié.
          </Link>
        </p>*/}
      </form>
    </div>
  );
}

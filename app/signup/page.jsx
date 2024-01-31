"use client";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation"; //attention PAS "next/router";


export default function SignUp() {
  
  const router = useRouter();
 // const auth = getAuth();//

  const handleSignUp = async (e) => {
    e.preventDefault();
    const {  email, password } = e.target.elements;

    await createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        window.alert("successfully create user")
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
        onSubmit={handleSignUp}
        className="max-width-sm max-height-sm border border-black rounded py-2 px-5  form-shadow" 
        style={{ "backgroundColor": "#ffffff" }}>
        <div className="fs-3  text-center my-2 fw-bold">
          Créer un compte
        </div>

        <div className="my-1">
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
            id="inputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text text-center">
            Nous ne partagerons jamais votre adresse e-mail.
          </div>
        </div>
        <div className="my-2">
          <label
            htmlFor="inputPassword1"
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
          
          className="btn btn-primary my-1 form-control"
        >
          Enregistrer
        </button>
        <p className="my-2 form-text text-center">
          Vous avez déjà un compte ? {""}
          <Link href="/signin" className=" link-underline-light">
            Connectez-vous.
          </Link>
        </p>
      </form>
    </div>
  );
 
}


/* option à traviller ensuite
        <div className="my-2">
          <label
            htmlFor="username"
            className="form-label text-center"
          >
            pseudo
          </label>
          <input
            type="text"
            name="username"
            placeholder="pseudo"
            className="form-control"
            id="inputUsername"
            aria-describedby="emailHelp"
          />
          </div>
*/
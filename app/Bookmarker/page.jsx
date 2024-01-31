"use client"
import Link from "next/link";
import CompleteRecipeCard from "../Components/CompleteRecipeCard";
import { useEffect, useState } from "react";
import { collection, getDocs} from "firebase/firestore"
import{db} from "../lib/firebase";
import NavListAdd from "../Components/NavListAdd"


//recipe-card
export default function Bookmarker({  }) {

  return (
    
    <main className="my-3 container">
        
        <div>
        <NavListAdd/>
          test bookmarker
        </div>

    </main>
  );
}

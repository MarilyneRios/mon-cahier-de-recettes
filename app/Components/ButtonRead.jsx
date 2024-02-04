import React from "react";
import Link from "next/link";


export default function ButtonRead() {
  return (
    <>
      <div className="d-flex justify-content-end align-items-top">
        <div className="rounded " >
        <Link
          href={"/recipes/read"}
           // href={"/"}
        className="btn btn-outline-success  m-1 text-decoration-none"
      >
        Lire
      </Link>
        </div>
      </div>
   
    </>
  );
}

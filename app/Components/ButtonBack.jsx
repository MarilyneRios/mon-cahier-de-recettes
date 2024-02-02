import React from 'react'
import Link from "next/link";

export default function ButtonBack({}) {
  return (
    <>
    <div className="d-flex justify-content-end align-items-top">
      <div className="rounded " >
        <Link
          href={"/"}
          className="btn btn-outline-success m-1 text-decoration-none"
        >
          retour
        </Link>
      </div>
    </div>
  </>
  )
}

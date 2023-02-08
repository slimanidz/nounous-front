import Link from "next/link"
import React from "react"
import NounousGet from "../components/NounousGet"

const Nounous = () => {
  return (
    <div>
      <Link href="/message">messages</Link>
      <h1>Agenda</h1>
      <h1>comments</h1>
      <NounousGet />
    </div>
  )
}

export default Nounous

import Link from "next/link"
import React from "react"
import ImageSrc from "../components/ImageSrc"
import Page from "../components/Page"

const Conexion = () => {
  return (
    <Page>
      <div className=" flex flex-col justify-cente  gap-5">
        <div className=" pt-[10%]  w-full flex justify-center">
          <ImageSrc
            src="/logo/logo-nounous.png"
            className="w-48 md:w-64 h-32 md:h-48"
          />
        </div>
        <p className=" pb-10 text-center">
          Bienvenu dans votre application NOUNOUS <br /> Pour accéder à toutes
          les fonctionnalités de votre application vous pouvez vous connecter
          comme utilisateur si vous êtes chercheur d'une nounous, comme vous
          pouvez vous connecter comme nounous si vous êtes une nounou!{" "}
        </p>
        <div className=" flex gap-5 justify-center">
          <div className="w-full flex flex-col items-center text-center gap-10 bg-red-30 ">
            <p>Vous êtes un utilisateur clic ici</p>
            <Link
              href="/sign-up"
              className=" h-20 w-[50%] bg-blue-700  text-white shadow-[-20px_35px_60px_10px_black] active:shadow-none flex items-center justify-center p-3 rounded-xl font-bold "
            >
              Utilisateur
            </Link>
          </div>
          <div className="w-full flex flex-col items-center text-center gap-10">
            <p>Vous êtes une nounou clic ici</p>
            <Link
              href="/sign-up-nounous"
              className="h-20 w-[50%] bg-blue-700  text-white shadow-[20px_35px_60px_10px_black] active:shadow-none  p-3 flex items-center justify-center rounded-xl font-bold "
            >
              Nounous
            </Link>
          </div>
        </div>
        {/* <div className="mt-20 bg-red-30 flex justify-center">
          <Link
            className="bg-blue-300 flex items-center justify-center p-2 rounded-xl hover:w-32 hover:h-20 hover:text-3xl hover:font-bold"
            href="/"
          >
            return
          </Link>
        </div> */}
      </div>
    </Page>
  )
}

export default Conexion

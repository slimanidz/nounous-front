import Link from "next/link"
import { useAppContext } from "../components/AppContext"
import { useAppContextNounou } from "../components/AppContextNounou"
import CommentsGet from "../components/CommentsGet"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ImageSrc from "../components/ImageSrc"
import NounousGet from "../components/NounousGet"
import ServiceGet from "../components/sercivesGet"
import ServicesNounous from "../components/ServicesNounous"
import Nounous from "./nounous"

const Home = () => {
  const {
    state: { session },
  } = useAppContext()
  const {
    state: { session1 },
  } = useAppContextNounou()
  return (
    <div className=" h-screen">
      <Header />
      <div className=" flex flex-col p-3 items-cente">
        {/* {session ? <p>{session.user.email}</p> : null}
        {session1 ? <p>{session1.nounou.email}</p> : null} */}
        <div className="bg-red-300 relative">
          {" "}
          <ImageSrc
            src="images/bg-nounou.webp"
            className="w-full md:h-[500px] "
          />
          <div className="w-full flex items-center justify-center bg-red-20 flex-co gap-  absolute top-[80%]">
            <Link
              href="https://www.service-public.fr/particuliers/vosdroits/F798#:~:text=Pour%20devenir%20assistante%20maternelle%20agr%C3%A9%C3%A9e,sur%20un%20site%20internet%20d%C3%A9di%C3%A9."
              className="bg-blue-70 hover:bg-blue-300 text-whit rounded-xl font-bold md:text-2xl p-2"
            >
              Etre nounou
            </Link>
            <Link
              href="/conditions"
              className="bg-blue-70 hover:bg-blue-300 text-whit rounded-xl font-bold md:text-2xl p-2"
            >
              Conditions
            </Link>
            <Link
              href="https://www.assistante-maternelle.biz/assistante-maternelle/lettre-type.html"
              className="bg-blue-70 hover:bg-blue-300 text-whit rounded-xl font-bold md:text-2xl p-2"
            >
              Documetations
            </Link>
          </div>
        </div>
        <div className="md:flex items-center gap-5 justify-center">
          <div className="md:w-64 md:h-64 m-3 bg-slate-300 border-4 border-slate-400 rounded-xl flex justify-center  gap-2 md:flex-col items-center">
            <ImageSrc src="logo/logo-nounous1.png" className="w-32 h-20" />
            <h1 className="font-bold text-xl">Securiser et efficace</h1>
            <p className="text-center">
              Tous les jours, des centaines de nouvelles annonces.
            </p>
          </div>
          <div className="md:w-64 md:h-64 m-3 bg-slate-300 border-4 border-slate-400 rounded-xl flex justify-center  gap-2 md:flex-col items-center">
            <ImageSrc src="logo/nounous2.png" className="w-32 h-20" />
            <h1 className="font-bold text-xl">Confiance</h1>
            <p className="text-center">
              Profils complets, vérifications, avis : recrutez sereinement.
            </p>
          </div>
          <div className="md:w-64 md:h-64 m-3 bg-slate-300 border-4 border-slate-400 rounded-xl flex justify-center  gap-2 md:flex-col items-center">
            <ImageSrc src="logo/nounou-free.png" className="w-32 h-20" />
            <h1 className="font-bold text-xl">Gratuite</h1>
            <p className="text-center">
              Se contacter et se rencontrer gratuitement ? Ici c'est possible
            </p>
          </div>
        </div>

        {!session1 ? (
          <div>
            <NounousGet />
            <Link href="/test">upload</Link>
          </div>
        ) : null}
        {session1 ? (
          <div>
            <Nounous />
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  )
}
export default Home

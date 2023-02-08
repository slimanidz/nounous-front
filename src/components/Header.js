import { useRouter } from "next/router"
import { useAppContext } from "./AppContext"
// import BurgerMenu from "./BurgerMenu"
import { VscSignOut } from "react-icons/vsc"
import { AiOutlineUser } from "react-icons/ai"
import ImageSrc from "./ImageSrc"
import Link from "next/link"
import { useAppContextNounou } from "./AppContextNounou"

const Header = () => {
  const router = useRouter()

  const {
    state: { session },
  } = useAppContext()
  const {
    state: { session1 },
  } = useAppContextNounou()

  const { setSession } = useAppContext()
  const { setSessionNounou } = useAppContextNounou()

  const handelClick = () => {
    setSession()
    router.push("/")

    return
  }
  const handelClick1 = () => {
    setSessionNounou()

    router.push("/")

    return
  }

  return (
    <header className="flex justify-between">
      {/* <BurgerMenu /> */}
      <div className=" flex justify-center grow p-2">
        <ImageSrc src="/logo/logo-nounous.png" className="w-32 md:w-48 h-10" />
      </div>
      {session || session1 ? (
        <div className="flex items-center ">
          {session ? (
            <h1>
              {" "}
              Bonjour{" "}
              <span className="text-blue-600 pr-2">
                {session.user.username}
              </span>
            </h1>
          ) : null}
          {session1 ? (
            <h1 className="text-blue-600 pr-2"> {session1.nounou.username}</h1>
          ) : null}

          {session ? (
            <button onClick={handelClick}>
              {" "}
              <VscSignOut className="w-[50px] h-[50px] pt-2 pr-2" />
            </button>
          ) : null}
          {session1 ? (
            <button onClick={handelClick1}>
              {" "}
              <VscSignOut className="w-[50px] h-[50px] pt-2 pr-2" />
            </button>
          ) : null}
        </div>
      ) : (
        <h1 className=" font-bold  px-4 pt-2 border-b-2">
          <Link href="/conexion">
            <AiOutlineUser className="w-[35px] h-[35px]" />
          </Link>{" "}
        </h1>
      )}
    </header>
  )
}

export default Header

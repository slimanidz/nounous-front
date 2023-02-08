import Link from "next/link"
import { BiHome, BiCog } from "react-icons/bi"
import { FcReadingEbook } from "react-icons/fc"
import { ImStatsBars } from "react-icons/im"

const Footer = () => {
  return (
    <footer className="flex w-full justify-between sticky bottom-0 bg-gradient-to-b from-gray-100 to-gray-500">
      <h1>
        <Link href="/">
          <BiHome className="w-[50px] h-[50px] pl-4" />
        </Link>{" "}
      </h1>
      <h1 className="">
        <Link href="/book-bebe">
          <FcReadingEbook className="w-[50px] h-[50px] pt-2" />
        </Link>{" "}
      </h1>
      <h1 className=" font-bold">
        <Link href="/statistiques">
          <ImStatsBars className="w-[40px] h-[40px] pt-2" />
        </Link>{" "}
      </h1>
      <h1 className="">
        <Link href="/setting">
          <BiCog className="w-[50px] h-[50px] pr-4" />
        </Link>{" "}
      </h1>
    </footer>
  )
}
export default Footer

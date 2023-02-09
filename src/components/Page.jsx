import Footer from "./Footer"
import Header from "./Header"

const Page = (props) => {
  const { children } = props

  return (
    <div className="h-screen flex flex-col ">
      {/* <Header /> */}

      <article className="grow overflow-y-auto">{children}</article>

      <Footer />
    </div>
  )
}
export default Page

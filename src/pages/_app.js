import { AppContextProvider } from "../components/AppContext"
import { AppContextNounouProvider } from "../components/AppContextNounou"
import "../styles/globals.css"

const App = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <AppContextNounouProvider>
        <Component {...pageProps} />
      </AppContextNounouProvider>
    </AppContextProvider>
  )
}

export default App

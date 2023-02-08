import deepmerge from "deepmerge"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

const AppContextNounou = createContext()
const initialState = {
  sessionNounou: null,
}

export const useAppContextNounou = () => useContext(AppContextNounou)

export const AppContextNounouProvider = (props) => {
  const [state, setState] = useState(initialState)
  const updateState = useCallback(
    (newState) =>
      // setState((previousState) => deepmerge(previousState, newState)),
      setState(newState),
    []
  )
  const setSessionNounou = useCallback(
    (jwt1) => {
      if (!jwt1) {
        localStorage.removeItem("sessionNounou_jwt1")
        updateState({ sessionNounou: null })

        return
      }

      const sessionNounou = JSON.parse(atob(jwt1.split(".")[1]))

      localStorage.setItem("sessionNounou_jwt1", jwt1)

      updateState(sessionNounou)
    },
    [updateState]
  )

  useEffect(() => {
    setSessionNounou(localStorage.getItem("sessionNounou_jwt1"))
  }, [setSessionNounou])

  return (
    <AppContextNounou.Provider
      {...props}
      value={{
        setSessionNounou,
        state,
      }}
    />
  )
}

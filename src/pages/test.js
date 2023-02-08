import { useCallback, useState } from "react"
import api from "../services/api"
import { Field, Form, Formik } from "formik"

// import "./App.css"

async function postImage({ image }) {
  const formData = new FormData()
  formData.append("image", image)

  const result = await api.post("/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  console.log(result.data)
  return result.data
}

const App = () => {
  const [file, setFile] = useState()
  const [images, setImages] = useState([])
  console.log(file)
  console.log(images)

  const handleSubmit = async (event) => {
    console.log("abc")
    event.preventDefault()
    const result = await postImage({ image: file })
    setImages([result.image, ...images])
    console.log(result)
  }

  const fileSelected = (event) => {
    const file = event.target.files[0]
    setFile(file)
  }
  console.log(file)

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>

        <button type="submit">Submit</button>
      </form>
      <div className="flex items-center justify-center">
        <div className="bg-auto bg-[url('/images/bg-nounou.webp')] ">
          Binvenu dans voutre application NOUNOUS Pour acceder a toutes les
          fonctionalites de votre application vous pouvez vous connecter comme
          utilisateur si vous ete chercheur d'une nounous comme vous pouvez vous
          connecter comme nounous si vous ete une nounou!
        </div>
      </div>

      <div>
        https://i.enfant.com/1400x787/smart/2019/09/24/24343-jeux-bebe.jpg
      </div>
    </div>
  )
}

export default App

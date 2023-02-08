import React, { useCallback, useEffect, useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { useRouter } from "next/router.js"
import { AxiosError } from "axios"
// import Modal from "@/components/Modal.jsx";
// import Link from "@/components/Link";
// import api from "@/services/api";
import { BiShowAlt, BiLowVision } from "react-icons/bi"
import Link from "next/link"
import api from "../services/api"
import validationSchema from "../components/Validateur"
import ServicesNounous from "../components/ServicesNounous"
import ImageSrc from "../components/ImageSrc"
// import validationSchema from "@/components/Validateur";
// import Button from "@/components/Button";
// import Footer from "@/components/Footer";
// import ImageSrc from "@/components/ImageSrc";
// import getRandomInt from "@/components/Random";

const initialValues = {
  username: "",
  telephone: "",
  email: "",
  localite: "",
  type: "",
  image: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  name1: false,
  name2: false,
  name3: false,
  name4: false,
  name5: false,
  name6: false,
  name7: false,
  name8: false,
}
const initialValues1 = {
  number: 0,
}
const SignUpNounous = () => {
  const [openModal, setOpenModal] = useState(false)
  const [visible, setVisiblity] = useState(false)
  const [visible1, setVisiblity1] = useState(false)

  const onClose = () => {
    setOpenModal(false)
  }
  const router = useRouter()
  const [checkedValue, setValue] = useState([])

  const hadleChange = (event) => {
    const { value, checked } = event.target

    if (checked) {
      setValue((pre) => [...pre, value])
    } else
      setValue((pre) => {
        return [...pre.filter((skill) => skill !== value)]
      })
  }
  const service1 = checkedValue[0]
  const service2 = checkedValue[1]
  const service3 = checkedValue[2]
  const service4 = checkedValue[3]
  const service5 = checkedValue[4]
  const service6 = checkedValue[5]
  const service7 = checkedValue[6]
  const service8 = checkedValue[7]

  const handleSubmit = useCallback(
    async ({ email, username, telephone, password, localite, type }) => {
      const situation = type

      const {
        data: { result },
      } = await api.post("/nounous", {
        email,
        username,
        telephone,
        localite,
        situation,
        password,
      })(result.id)

      const nounouId = result.id

      const {
        data: { count },
      } = await api.post("/services", {
        service1,
        service2,
        service3,
        service4,
        service5,
        service6,
        service7,
        service8,
        nounouId,
      })
      router.push("sign-in-nounous")
    },

    [router]
  )

  const handleVisionOn = () => {
    setVisiblity(true)
  }
  const handleVisionOff = () => {
    setVisiblity(false)
  }

  const handleVisionOn1 = () => {
    setVisiblity1(true)
  }
  const handleVisionOff1 = () => {
    setVisiblity1(false)
  }

  return (
    <div className="h-screen flex flex-col">
      <div className=" flex flex-col grow items-center bg-gradient-to-b from-gray-100 to-gray-500  rounded-md border-2 border-indigo-600 ">
        <div className=" py-10">
          <ImageSrc src="/logo/logo-nounous.png" className="w-48 h-15" />
        </div>
        <div>
          <div className="text-center">
            <h1 className="text-center text-4xl font-bold mb-5  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-900 ">
              Sign-Up Nounous
            </h1>
            <p>
              deja inscrit?{" "}
              <Link
                className="hover:underline font-bold"
                href="/sign-in-nounous"
              >
                {" "}
                se connecter
              </Link>
            </p>
          </div>
          {/* {errors.length ? (
            <div className="rounded-lg border-4 border-red-600 mb-4 flex flex-col gap-4 p-4">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null} */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label>Email *:</label>
                  <Field
                    type="email"
                    name="email"
                    className="border-2 border-black px-2 rounded"
                  />
                  <ErrorMessage
                    name="email"
                    component="small"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Username *:</label>
                  <Field
                    type="text"
                    name="username"
                    className="border-2 border-black px-2 rounded "
                  />
                  <ErrorMessage
                    name="username"
                    component="small"
                    className="text-red-600 "
                  />
                </div>
                <div className="flex flex-col">
                  <label>localite *:</label>
                  <Field
                    type="text"
                    name="localite"
                    className="border-2 border-black px-2 rounded "
                  />
                  <ErrorMessage
                    name="localite"
                    component="small"
                    className="text-red-600 "
                  />
                </div>
                <div className="flex flex-col">
                  <label>telephone *:</label>
                  <Field
                    type="text"
                    name="telephone"
                    className="border-2 border-black px-2 rounded"
                  />
                  <ErrorMessage
                    name="telephone"
                    component="small"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label>image *:</label>
                  <Field
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    className="border-2 border-black rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <label>situation *:</label>

                  <Field className=" p-1 rounded " as="select" name="type">
                    <option value="">selectionner votre situation</option>
                    <option value="Je suis professionnelle de la Petite Enfance">
                      Je suis professionnelle de la Petite Enfance
                    </option>
                    <option value="Je suis étudiante">Je suis étudiante</option>
                    <option value="Je suis salariée à temps partiel">
                      Je suis salariée à temps partiel
                    </option>
                    <option value="Je suis jeune retraitée">
                      Je suis jeune retraitée{" "}
                    </option>
                    <option value="autre">autre</option>
                  </Field>
                </div>
                {/* kkkkkkkkkkkkkkkkkkkkkk */}
                <div className="flex flex-col gap-3 ">
                  <div>selection les services :</div>
                  <div>
                    <input
                      type="checkbox"
                      value="garde enfant jour"
                      onChange={hadleChange}
                    />
                    <span className="px-2">garde enfant jour</span>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      value="garde enfant nuit"
                      onChange={hadleChange}
                    />
                    <span className="px-2">garde enfant nuit</span>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      value="garde enfant jour et nuit"
                      onChange={hadleChange}
                    />
                    <span className="px-2">garde enfant jour et nuit</span>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      value="recuperer l'enfant de l'ecole"
                      onChange={hadleChange}
                    />
                    <span className="px-2">recuperer l'enfant de l'ecole</span>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      value="soutien scolaire"
                      onChange={hadleChange}
                    />
                    <span className="px-2">soutien scolaire</span>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      value="garde enfant moin de 2 ans"
                      onChange={hadleChange}
                    />
                    <span className="px-2">garde enfant moin de 2 ans</span>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      value="prepare a manger"
                      onChange={hadleChange}
                    />
                    <span className="px-2">prepare a manger</span>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      value="autre"
                      onChange={hadleChange}
                    />
                    <span className="px-2">autre</span>
                  </div>
                </div>
                {/* kkkkkkkkkkkkkkkkkkkkkk */}
                <div className="flex flex-col">
                  <label>Mot de passe *:</label>
                  <div className="flex items-center justify-between border-2  border-black rounded bg-white">
                    <Field
                      type={visible ? "text" : "password"}
                      name="password"
                      className=" px-2"
                    />
                    {visible ? (
                      <span onClick={handleVisionOff}>
                        <BiLowVision className=" w-6 h-6 hover:text-red-600 hover:cursor-pointer" />
                      </span>
                    ) : (
                      <span onClick={handleVisionOn}>
                        <BiShowAlt className=" w-6 h-6 hover:text-red-600 hover:cursor-pointer" />
                      </span>
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="small"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Confirmer le mot de passe *:</label>
                  <div className="flex items-center justify-between border-2 border-black rounded bg-white">
                    <Field
                      type={visible1 ? "text" : "password"}
                      name="confirmPassword"
                      className=" px-2"
                    />
                    {visible1 ? (
                      <span onClick={handleVisionOff1}>
                        <BiLowVision className=" w-6 h-6 hover:text-red-600 hover:cursor-pointer" />
                      </span>
                    ) : (
                      <span onClick={handleVisionOn1}>
                        <BiShowAlt className=" w-6 h-6 hover:text-red-600 hover:cursor-pointer " />
                      </span>
                    )}
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="small"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <Field
                      name="acceptTerms"
                      type="checkbox"
                      className="form-check-input"
                    />
                    <label className="form-check-label">
                      J'ai lu et j'accepte
                      <span className="underline decoration-solid">
                        <button
                          className="underline pl-1"
                          // onClick={handleClick}
                        >
                          les conditions d'utilisation
                        </button>
                      </span>
                      <span>*</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="acceptTerms"
                    component="small"
                    className="text-red-600"
                  />
                  <p className="text-sm"> * champs obligatoire</p>
                </div>
                <div className="flex gap-3 my-3">
                  <button
                    type="submit"
                    className="text-center   focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                    disabled={!formik.isValid || formik.isSubmitted}
                  >
                    S'inscrire
                  </button>

                  <Link href="/home" className="hover:underline pt-2">
                    continue sans inscription
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default SignUpNounous

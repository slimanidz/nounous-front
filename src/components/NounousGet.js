import React, { useCallback, useEffect, useState } from "react"
import api from "../services/api"
import ImageSrc from "./ImageSrc"
import Modal from "./Modal"
import { FaPhone } from "react-icons/fa"
import { BiRightArrowAlt } from "react-icons/bi"

import { useAppContext } from "./AppContext"
import Link from "next/link"
import { Field, Form, Formik } from "formik"
import ModalComments from "./ModalComment"
import { useAppContextNounou } from "./AppContextNounou"
import Message from "./Message"

const initialValue = {
  adresse: "",
}

const NounousGet = () => {
  const {
    state: { session },
  } = useAppContext()
  const {
    state: { session1 },
  } = useAppContextNounou()
  const [nounous, setNounous] = useState(null)
  const [nounouIdComment, setNounouIdComment] = useState(0)
  const [adresse, setAdresse] = useState("")
  const [services, setServices] = useState([])
  const [nounou, setNounou] = useState([])
  const [nounouService, setNounouService] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalServices, setOpenModalServices] = useState(false)
  const [openModalComments, setOpenModalComments] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const onClose = () => {
    setOpenModal(false)
    setOpenModalServices(false)
    setOpenModalComments(false)
  }
  const handelFilter = useCallback(async ({ adresse }) => {
    if (adresse === "") {
      return
    }

    console.log(adresse)
    const {
      data: { result },
    } = await api.get(`nounous/adresse/${adresse}`)
    setNounous(result)
    console.log(nounous)
  }, [])

  useEffect(() => {
    ;(async () => {
      const {
        data: { result },
      } = await api.get("nounous")
      setNounous(result)
    })()
  }, [])

  if (!nounous) {
    return <p>Loading </p>
  }

  const handleClickContact = async (event) => {
    const nounouId = Number(event.currentTarget.getAttribute("data-id"))
    const {
      data: { result },
    } = await api.get(`/nounous/${nounouId}`)
    setNounou(result)
    setNounouIdComment(nounouId)

    setOpenModal(true)

    // setOpenModal(true)
  }

  const handleClickServices = async (event) => {
    const hiddenFields = ["id", "nounouId", "createdAt", "updatedAt"]
    const nounouId = Number(event.currentTarget.getAttribute("data-id"))
    const {
      data: { result1 },
    } = await api.get(`services/${nounouId}`)
    setServices(result1)
    const servicefiltre = result1.map((row) =>
      Object.fromEntries(
        Object.entries(row).filter(([field]) => !hiddenFields.includes(field))
      )
    )
    setServices(servicefiltre)
    setOpenModalServices(true)
    const {
      data: { result },
    } = await api.get(`/nounous/${nounouId}`)
    setNounouService(result)
  }

  const handleClickComment = async (event) => {
    const nounouId = Number(event.currentTarget.getAttribute("data-id"))
    setNounouIdComment(nounouId)
    setOpenModalComments(true)
    // const {
    //   data: { result },
    // } = await api.get(`/nounous/${nounouId}`)
    // setNounou(result)
    // setOpenModal(true)

    // setOpenModal(true)
  }

  return (
    <div className=" overflow-y-auto ">
      <div className=" flex  justify-center my-5">
        {/* <h1 className=" text-center  text-2xl ">LIST OF nounous</h1> */}
        <div>
          <Formik onSubmit={handelFilter} initialValues={initialValue}>
            <Form className="w-full md:flex gap-3 bg-red-200 p-2 rounded-xl my-5 ">
              <p className="md:text-xl md:font-bold">
                Trounver une nounou proche de vous!
              </p>
              <Field
                className=" border-2 border-black px-2 rounded-xl"
                name="adresse"
                placeholder="entrer votre ville"
              />
              <button
                type="submit"
                className="bg-blue-600 active:bg-blue-300 text-white font-bold px-2 py-1 rounded-xl"
              >
                Ok
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <ul className=" bg-red-30">
        {nounous.map((nounou) => (
          <li
            className=" flex justify-between  odd:bg-slate-200 rounded-xl"
            key={nounou.id}
          >
            <div className="w-full flex border-b-4 border-black rounded-xl">
              <ImageSrc
                src="/images/nounou1.jpeg"
                className="w-20 h-20 rounded-xl"
                alt="image"
              />
              <div className="flex flex-col">
                <span className="px-2   bg-blue-60">
                  nom: {nounou.username}
                </span>
                <span className="px-2   bg-red-60">
                  localite: {nounou.localite}
                </span>
                <span className="px-2  bg-blue-30">
                  situation: {nounou.situation}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-slate-300 rounded-xl">
              <button
                className="border-b-2 border-black hover:bg-slate-600 hover:text-white rounded-xl px-2"
                onClick={handleClickContact}
                data-id={nounou.id}
              >
                contact
              </button>
              <button
                className="border-b-2 border-black hover:bg-slate-600 hover:text-white rounded-xl px-2"
                onClick={handleClickServices}
                data-id={nounou.id}
              >
                services
              </button>
              <button
                className="border-b-2 border-black hover:bg-slate-600 hover:text-white rounded-xl px-2"
                onClick={handleClickComment}
                data-id={nounou.id}
              >
                commantaire
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        className={
          session || session1
            ? "bg-slate-50 p-5"
            : " flex justify-center items-center "
        }
        open={openModal}
      >
        {session || session1 ? (
          <div>
            <div className="w-full flex justify-end">
              <button onClick={onClose}>X</button>
            </div>

            <div className="flex flex-col items-center gap-5 mt-20">
              <ImageSrc
                src="/images/nounou1.jpeg"
                className="w-48 h-15 rounded-xl"
                alt="image"
              />
              <div>
                <h1>name :{nounou.username}</h1>
                <p>localite: {nounou.localite}</p>
                <p>E-mail: {nounou.email}</p>
                <div className="flex gap-3">
                  <p> telephone: {nounou.telephone}</p>

                  <button>
                    <FaPhone />
                  </button>
                </div>
                {session ? (
                  <div>
                    message:
                    <Message nounouId={nounouIdComment} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 w-80 h-80  shadow-lg shadow-black ">
            <div className="w-full flex justify-end">
              <button onClick={onClose}>X</button>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 p-5">
              <p className="text-center">
                vous n'ete pas connecter, vous deveraiez vous connecter pour
                contacter les nounous
              </p>
              <Link
                className="bg-blue-600 active:bg-blue-300 rounded-xl p-2 text-white font-bold"
                href="/sign-up"
              >
                connecter
              </Link>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        className="w-screen h-screen bg-slate-50 flex justify-center items-center"
        open={openModalServices}
      >
        <div className="bg-slate-100 p-5  shadow-lg shadow-black ">
          <div className="w-full flex justify-end">
            <button
              className="p-2 bg-blue-700 active:bg-blue-300 text-white text-3xl font-bold rounded-xl"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className=" ">
            <div className=" flex justify-between text-2xl sticky top-0">
              <h1 className=" text-center  text-2xl ">
                {" "}
                name: {nounouService.username}
              </h1>
            </div>

            {services.length === 0 ? (
              <p>no services difined ...</p>
            ) : (
              <ul className="  ">
                <h1 className="p-2 text-3xl font-bold text-center ">
                  Services:
                </h1>
                {services.map((service) => (
                  <li className="flex flex-col gap-3 odd:bg-red-300  ">
                    <h1 className="px-2 flex gap-2   bg-red-">
                      {" "}
                      {service.service1 ? <BiRightArrowAlt /> : null}{" "}
                      {service.service1}
                    </h1>

                    <h1 className="px-2 flex gap-2   bg-red-">
                      {" "}
                      {service.service2 ? <BiRightArrowAlt /> : null}
                      {service.service2}
                    </h1>

                    <h1 className="px-2 flex gap-2   bg-red-">
                      {" "}
                      {service.service3 ? <BiRightArrowAlt /> : null}
                      {service.service3}
                    </h1>

                    <h1 className="px-2 flex gap-2   bg-red-">
                      {" "}
                      {service.service4 ? <BiRightArrowAlt /> : null}
                      {service.service4}
                    </h1>

                    <h1 className="px-2 flex gap-2   bg-red-">
                      {" "}
                      {service.service5 ? <BiRightArrowAlt /> : null}
                      {service.service5}
                    </h1>

                    <h1 className="px-2 flex gap-2   bg-red-">
                      {" "}
                      {service.service6 ? <BiRightArrowAlt /> : null}
                      {service.service6}
                    </h1>

                    <h1 className="px-2 flex gap-2   bg-red-">
                      {" "}
                      {service.service7 ? <BiRightArrowAlt /> : null}
                      {service.service7}
                    </h1>

                    <h1 className="px-2 flex gap-2   bg-red-">
                      {service.service8 ? <BiRightArrowAlt /> : null}
                      {service.service8}
                    </h1>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Modal>
      <ModalComments
        className=" h-screen bg-slate-50 flex "
        open={openModalComments}
        nounouId={nounouIdComment}
      >
        <div className=" flex justify-end ">
          <button
            className="p-2 bg-blue-700 active:bg-blue-300 text-white text-3xl font-bold rounded-xl"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </ModalComments>
    </div>
  )
}

export default NounousGet

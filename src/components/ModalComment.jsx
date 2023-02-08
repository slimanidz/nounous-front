const { default: classNames } = require("classnames")
import { ErrorMessage, Field, Form, Formik } from "formik"
import Link from "next/link"
import React, { useCallback, useEffect, useState } from "react"
import api from "../services/api"
import { useAppContext } from "./AppContext"
import CommentsGet from "./CommentsGet"
import validationSchema from "./Validateur"

const initialValues = {
  content: "",
}

const ModalComments = (props) => {
  const { open, children, nounouId, className } = props
  const {
    state: { session },
  } = useAppContext()

  if (!open) {
    return null
  }

  const handleSubmit = useCallback(
    async ({ content, restform }) => {
      const userId = session.user.id
      console.log(content, userId, nounouId)
      const {
        data: { count },
      } = await api.post("/comments", {
        content,
        userId,
        nounouId,
      })

      if (count) {
        restform()
        // router.push("/users/sign-in");

        return
      }
    },

    []
  )

  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 w-full  flex flex-col object- h-screen overflow-auto rounded-md border-2 border-indigo-600   ",
          className
        )}
      >
        <div className="">{children}</div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col gap-3 justify-cente items-cente">
              <div className="flex flex-col">
                <h1 className="p-4 text-3xl font-bold ">
                  Laisser un commentaire pour votre nounou
                </h1>
                <label>content *:</label>
                <Field
                  as="textarea"
                  name="content"
                  className="border-2 border-black px-2 rounded"
                  placeholder="contenu"
                />
                <ErrorMessage
                  name="content"
                  component="small"
                  className="text-red-600"
                />
              </div>

              {session ? (
                <button
                  type="submit"
                  className="p-2 text font-bold text-white bg-blue-500 active:bg-blue-400 rounded"
                >
                  envoyer
                </button>
              ) : (
                <Link
                  href="/sign-up"
                  className="p-2 text-center font-bold text-white bg-blue-500 active:bg-blue-400 rounded"
                >
                  Vous pouvez pas commenter!
                  <span className="text-red-900 text-xl pl-2 font-bold bg-red-30">
                    Connecter
                  </span>{" "}
                  pour commneter?
                </Link>
              )}
            </Form>
          </Formik>
          <CommentsGet nounouId={nounouId} />
        </div>
      </div>
    </>
  )
}

export default ModalComments

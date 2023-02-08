import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useCallback } from "react"
import api from "../services/api"
import { useAppContext } from "./AppContext"
import validationSchema from "./Validateur"

const initialValues = {
  content: "",
}

const Message = (props) => {
  const { nounouId } = props
  console.log(nounouId)
  const {
    state: { session },
  } = useAppContext()

  const handleSubmit = useCallback(
    async ({ content, restform }) => {
      const userId = session.user.id
      console.log(content, userId)
      if (content === "") {
        return
      }
      const {
        data: { count },
      } = await api.post("/messages", {
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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-3 justify-center items-center">
          <div className="flex flex-col">
            <label>content **:</label>
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

          <button
            type="submit"
            className="p-2 text font-bold text-white bg-blue-500 active:bg-blue-400 rounded"
          >
            envoyer
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default Message

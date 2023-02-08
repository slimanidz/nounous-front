import { Field, Form, Formik } from "formik"
import React, { useCallback, useState } from "react"
import api from "../services/api"

const initialValues = {
  name1: false,
  name2: false,
  name3: false,
  name4: false,
  name5: false,
  name6: false,
  name7: false,
  name8: false,
}

const ServicesNounous = (props) => {
  ////////////////////////////////////////////
  const { nounouId } = props
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

  const handleSubmit = useCallback(async () => {
    const {
      data: { result },
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
  }, [])

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="flex flex-col gap-3">
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
            <input type="checkbox" value="autre" onChange={hadleChange} />
            <span className="px-2">autre</span>
          </div>
          <div>
            {" "}
            <button type="submit">add</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ServicesNounous

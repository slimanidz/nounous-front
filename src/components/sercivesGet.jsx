import React, { useCallback, useEffect, useState } from "react"
import api from "../services/api"
import ImageSrc from "./ImageSrc"
import Modal from "./Modal"
import { FaPhone } from "react-icons/fa"
import { useAppContext } from "./AppContext"
import Link from "next/link"

const ServiceGet = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    ;(async () => {
      const {
        data: { result },
      } = await api.get("services")
      setServices(result)
    })()
  }, [])
  if (!services) {
    return <p>Loading </p>
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold">services:</h1>
      <ul className=" bg-red-30">
        {services.map((service) => (
          <li
            className=" flex justify-between  odd:bg-slate-200 rounded-xl"
            key={service.id}
          >
            <div className="w-full flex border-b-4 border-black rounded-xl">
              <div className="flex flex-col">
                <span className="px-2   bg-blue-60">id: {service.id}</span>
                <span className="px-2   bg-red-60">
                  services: {service.service}
                </span>
                <span className="px-2  bg-blue-30">
                  date d'inscription: {service.createdAt}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ServiceGet

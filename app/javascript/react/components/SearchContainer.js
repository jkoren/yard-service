import React, { useState, useEffect } from "react"

import streetTile from "./StreetTile"
import StreetFormContainer from "./StreetFormContainer"

const StreetsIndexContainer = (props) => {
  const [streets, setStreets] = useState([])

  const getStreets = (streetName) => {
    fetch('/api/v1/streets')
      .then((response) => {
        if (response.ok) {
          return response
        } else {
          // throw error
        }
      })
      .then((response) => response.json())
      .then((responseBody) => {
        setStreets(responseBody)
      })
  }, [])

  const addNewStreet = (newStreetObject) => {
    fetch("/api/v1/streets", {
      method: "POST",
      body: JSON.stringify(newStreetObject)
    })
      .then((response) => {
        return response.json()
      })
      .then((responseBody) => {
        setStreets([
          ...streets,
          responseBody
        ])
      })
  }
  const streetTiles = streets.map((street) => {
    return (
      <StreetTile
        key={street.id}
        street={street}
      />
    )
  })

  return (
    <div className="grid-container">
      <div className="">
        <h1 className="jeffTitle">Jeff's Blog!</h1>

        <hr />

        <StreetFormContainer addNewStreetFunction={addNewStreet} />
        
        {streetTiles}
      </div>
    </div>
  )
}

export default StreetsIndexContainer

//SearchContainer.js
import React, { useState, useEffect } from "react"
import StreetTile from "./StreetTile"

const SearchContainer = (props) => {
  const [streets, setStreets] = useState([])
  const [queryStreet, setQueryStreet] = useState("")

  const getStreets = () => {
    fetch(`/api/v1/streets?name=${queryStreet.street}`)
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
  }

  const handleChange = (event) => {
    setQueryStreet({
      ...queryStreet,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let streets
    let streetName
    streets = getStreets(streetName)
  } 

  const streetTiles = streets.map((street) => {
    return (
      <StreetTile
      key={street.id}
      street={street}
      />
      )
    })
    
  let streetSection 
  streetSection = (streets.length == 0) ? "No Street Found" : streetTiles

  return (
    <div className="grid-container">
      <br></br>
        <h2>Yard Waste Pickup Schedule</h2>

      <div>
        <div className="text-center">
          <img src="https://jkorenstein-production.s3.amazonaws.com/yard-service/map.png" height="130"/> 

          {streetSection}
  
          <form onSubmit={handleSubmit} > 
            <label>Street
              <input 
                name="street" 
                id="street"
                type="text"
                onChange={handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>

    </div>
  )
}

export default SearchContainer

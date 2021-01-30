//SearchContainer.js
import React, { useState, useEffect } from "react"
import StreetTile from "./StreetTile"
import AddressIndex from "./AddressIndex"

const SearchContainer = (props) => {
  const [streets, setStreets] = useState([])
  const [queryStreet, setQueryStreet] = useState("")
  const [searched, setSearched] = useState(false)

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
    getStreets()
    setSearched(true)
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
  let addressTiles
  addressTiles = ""
  if (searched == true) {
    if (streets.length == 0) {
      streetSection = <div>No Street Found: {queryStreet.street}</div>
    } else if (streets.length == 1) {
      let street
      street = streets[0]
      if (street.segments.length == 1) {
        // if only one street matches search, and it has only one segment (ABBOTT)
        let segment 
        segment = street.segments[0]

        // if I want to show all the addresses, not necessary
        // addressTiles = 
        //   <AddressIndex
        //   key="1",
        //   addresses={segment.addresses}
        //   />

        streetSection = 
          <div> 
            <hr></hr>
            {street.name} Zone:{segment.zone_number}<br></br>
            {segment.zone_pickup_week}/{segment.zone_pickup_day_of_week}
            <hr></hr>
          </div>
      } else if (streets[0].segments.length > 1) {
        streetSection = <div>{street.name} is in multiple zones.  What is address number?</div>
        // if only one street matches search, and it has more than one segment (TRAPELO)
      }
    } else if (streets.length > 1) {
      // multiple street match search term (ELM or GROVE)
      streetSection = streetTiles
    }
  }

  return (
    <div className="grid-container">
      <br></br>
      <h2>Yard Waste Pickup Schedule</h2>

      <div>
        <div className="text-center">
          <img src="https://jkorenstein-production.s3.amazonaws.com/yard-service/map.png" height="130"/> 

          {streetSection}
          <br></br>
          {addressTiles}
  
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

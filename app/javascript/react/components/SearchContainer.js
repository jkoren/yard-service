//SearchContainer.js
import React, { useState } from "react"
import StreetTile from "./StreetTile"
import SegmentTile from "./SegmentTile"

const SearchContainer = (props) => {
  const [streets, setStreets] = useState([])
  const [selectedStreet, setSelectedStreet] = useState({})
  const [selectedSegment, setSelectedSegment] = useState({})

  const [queryStreet, setQueryStreet] = useState("")
  const [queryAddressNumber, setQueryAddressNumber] = useState("")
  const [searched, setSearched] = useState(false)

  const getStreetsByName = () => {
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

  const handleStreetChange = (event) => {
    setSearched(false)
    setQueryStreet({
      ...queryStreet,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleAddressNumberChange = (event) => {
    setQueryAddressNumber({
      ...queryAddressNumber,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearched(true)
    getStreetsByName()
    if (streets.length == 1 && streets[0].segments.length == 1) {
      setSelectedSegment(streets[0].segments[0])
    }
  } 

  const handleStreetNameClick = (event) => {
    const chosenStreet = streets.filter((street) => {
      return street.name === event.target.innerHTML
    })
    setSelectedStreet(chosenStreet[0])
    if (chosenStreet[0].segments.length == 1) {
      setSelectedSegment(chosenStreet[0].segments[0])
    }
  }
  
  const streetChoices = streets.map((street) => {
    return (
      <StreetTile
        key={street.id}
        street={street}
        handleStreetNameClick={handleStreetNameClick}
      />
      )
    })

  const noStreetsFound = (searched && streets.length == 0)

  // if only one street matches search, and it only has one segment (ABBOTT)
  const oneSegmentFound = (searched && streets.length == 1 && streets[0].segments.length == 1)
  
  // HOW TO setSelectedSegment if oneSegmentFound?  a setSelected goes into infinite loop

  // if only one street matches search, but that street has more than one segment(TRAPELO)
  const multipleSegmentsFound = (searched && streets.length == 1 && streets[0].segments.length > 1)  
  
  // if multiple streets match search (GROVE)
  const multipleStreetsFound = (streets.length > 1) 

  const streetSelected = !(selectedStreet.name === undefined)
  const segmentSelected = !(selectedSegment.zone_number === undefined)

  console.log("street selected:",streetSelected)
  console.log("segment selected:",segmentSelected)

  return (
    <div className="grid-container">
      <br></br>
      <h2>Yard Waste Pickup Schedule</h2>

      <div>
        <div className="text-center">
          <img src="https://jkorenstein-production.s3.amazonaws.com/yard-service/map.png" height="130"/> 
          {searched && streets.length == 0}
          <br></br>

          {noStreetsFound &&
            <div> No Street Found: {queryStreet.street}</div>
          }

          {multipleStreetsFound && streetChoices}

          {segmentSelected && 
            <SegmentTile 
              id={streets[0].segments[0].id}
              segment={streets[0].segments[0]}
            />}

          <form onSubmit={handleSubmit} > 

            <label>Street
              <input 
                name="street" 
                id="street"
                type="text" required
                onChange={handleStreetChange}
              />
            </label>

            {multipleSegmentsFound && 
            <div> {streets[0].name} is in multiple zones.
              <label> Address Number
                <input 
                  name="addressNumber" 
                  id="addressNumber"
                  type="text" required
                  onChange={handleAddressNumberChange}
                  />
              </label>
            </div>}

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>

    </div>
  )
}

export default SearchContainer

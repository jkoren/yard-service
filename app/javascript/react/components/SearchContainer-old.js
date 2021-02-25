//SearchContainer.js
import React, { useState } from "react"
import StreetTile from "./StreetIndexTile"
import SegmentShowTile from "./SegmentShowTile"

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
        return(responseBody)
      })
      .then((streets) => {
        console.log("fetching streets")
        console.log(streets)
        if (streets.length === 1) {
          console.log("one street!")
          setSelectedStreet(streets[0])
          return(streets[0])
        } else {
          console.log("multiple streets!")
          setSelectedStreet({})
          setSelectedSegment({})
          return(null)
        }
      })
      .then((street) => {
        console.log("evaluating street")
        console.log(street)
        if (street && street.segments.length === 1) {
          console.log("one segment!")
          setSelectedSegment(street.segments[0])
        }
      })
  }

  const handleStreetChange = (event) => {
    setSearched(false)
    setSelectedStreet({})
    setSelectedSegment({})
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
    setSelectedStreet({})
    setSelectedSegment({})
    getStreetsByName()
    setSearched(true)
    // if (streets.length == 1 && streets[0].segments.length == 1) {
    //   setSelectedSegment(streets[0].segments[0])
    // }
  } 

  const handleStreetNameClick = (event) => {
    const chosenStreet = streets.filter((street) => {
      return street.name === event.target.innerHTML
    })
    setSelectedStreet(chosenStreet[0])
    // Abbott
    if (chosenStreet[0].segments.length == 1) {
      setSelectedSegment(chosenStreet[0].segments[0])
    }
  }

  const handleSegmentNumberClick = (event) => {
    const chosenSegment = streets.segments.filter((segment) => {
      return segment.number === event.target.innerHTML
    })
    setSelectedSegment(chosenSegment[0])
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
  
  // const segmentChoices = selectedStreet.segments.map((street) => {
  //   return (
  //     <SegmentTile
  //       key={segment.id}
  //       segment={segment}
  //       handleSegmentNumberClick={handleSegmentNumberClick}
  //     />
  //     )
  //   })

  const noStreetsFound = (searched && streets.length == 0)

  // (TRAPELO)
  const multipleSegmentsFound = (searched && streets.length == 1 && streets[0].segments.length > 1)  
  
  // (GROVE)
  const multipleStreetsFound = (streets.length > 1) 

  const streetSelected = !(selectedStreet.name === undefined)
  const segmentSelected = !(selectedSegment.zone_number === undefined)

  console.log("street selected:",streetSelected)
  console.log(selectedStreet)
  console.log("segment selected:",segmentSelected)
  console.log(selectedSegment)

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

          {/* {multipleSegmentsFound && segmentChoices} */}

          {segmentSelected && 
            <SegmentShowTile 
              id={selectedSegment.id}
              street={selectedStreet}
              segment={selectedSegment}
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

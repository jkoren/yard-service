//SearchContainer.js
import React, { useState } from "react"
import StreetTile from "./StreetTile"
import SegmentTile from "./SegmentTile"
import SegmentShowTile from "./SegmentShowTile"

const SearchContainer = (props) => {
  const [streets, setStreets] = useState([])
  const [segments, setSegments] = useState([])
  const [selectedStreet, setSelectedStreet] = useState({})
  const [selectedSegment, setSelectedSegment] = useState({})

  const [queryStreet, setQueryStreet] = useState("")
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
      .then((streets) => {
        setStreets(streets)
        if (streets.length === 1) {
          setSelectedStreet(streets[0])
          if (streets[0].segments.length === 1) {
            setSelectedSegment(streets[0].segments[0])
          } else {
            setSegments(streets[0].segments)
            setSelectedSegment({})
          }
        } else {
          setSelectedStreet({})
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

  const handleSubmit = (event) => {
    event.preventDefault()
    setSelectedStreet({})
    setSelectedSegment({})
    getStreetsByName()
    setSearched(true)
  } 

  const handleStreetNameClick = (event) => {
    const chosenStreet = streets.filter((street) => {
      return street.name === event.target.innerHTML
    })
    setSelectedStreet(chosenStreet[0])
    // Abbott
    if (chosenStreet[0].segments.length == 1) {
      setSelectedSegment(chosenStreet[0].segments[0])
    } else if (chosenStreet[0].segments.length == 0) {
      setSelectedSegment({})
    } else if (chosenStreet[0].segments.length > 1) {
      // if the chosen street has more than one segment, e.g. Elm
      // what do we do?
      console.log("more than one segment - what do we do?")
      setSelectedSegment(chosenStreet[0].segments[0])
    }
  }

  const handleSegmentNumberClick = (event) => {
    const chosenSegment = segments.filter((segment) => {

      return event.target.innerHTML.startsWith("Zone:"+segment.zone_number)
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
  
  const segmentChoices = segments.map((segment) => {
    return (
      <SegmentTile
        key={segment.id}
        segment={segment}
        handleSegmentNumberClick={handleSegmentNumberClick}
      />
      )
    })
    
  const numSegmentsInSelectedStreet = (selectedStreet  && selectedStreet.segments && selectedStreet.segments.length)
  const multipleSegmentsInSelectedStreet = numSegmentsInSelectedStreet > 1

  const multipleSegmentsInSelectedStreetChoices = selectedStreet && selectedStreet.segments && selectedStreet.segments.map((segment) => {
    return (
      <SegmentTile
        key={segment.id}
        segment={segment}
        handleSegmentNumberClick={handleSegmentNumberClick}
      />
      )
    })

  const noStreetsFound = (searched && streets.length == 0)

  // (TRAPELO or ELM)
  const multipleSegmentsFound = (searched && (streets.length == 1 && streets[0].segments.length > 1))  
  
  // (GROVE)
  const multipleStreetsFound = (streets.length > 1) 

  // const streetSelected = !(selectedStreet.name === undefined)
  const segmentSelected = !(selectedSegment.zone_number === undefined)

  const chooseZone = "Choose Zone"

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

          {multipleSegmentsFound && segmentChoices}

          {multipleSegmentsInSelectedStreet && !multipleSegmentsFound && chooseZone}
          {multipleSegmentsInSelectedStreet && !multipleSegmentsFound && multipleSegmentsInSelectedStreetChoices}

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

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>

    </div>
  )
}

export default SearchContainer

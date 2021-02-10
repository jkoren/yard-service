//SegmentTile.js
import React from "react"
import DayTile from "./DayTile"
// import './DayTile.css'

const SegmentTile = (props) => {
  var days
  days = props.segment.zone_pickup_days.map((day) => {
      return (
        <DayTile
          key={day.id}
          date={day.date}
        />
      )
    }
  )

  return ( 
    <div> 
      Zone:{props.segment.zone_number}<br></br>
      {/* <div className="grid-x  callout"> */}
      <div className="grid-x small-up-2 medium-up-4 callout">
        {days}
      </div>
    </div>
  )
}

export default SegmentTile
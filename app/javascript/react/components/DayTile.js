// DayTile.js
import React from "react"
const DayTile = (props) => {
  var thedate = new Date(props.date).toDateString()
  return (
    <div className="cell"> 
      {thedate}
    </div>
  )
}

export default DayTile
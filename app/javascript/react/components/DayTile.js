// DayTile.js
import React from "react"
const DayTile = (props) => {
  var thedate = new Date(props.date).toDateString()
  return (
    <div className="cell"> 
      {thedate}
    </div>
    // <li className="cell"> 
    //   {thedate}
    // </li>
  )
}

export default DayTile